import fetch from 'cross-fetch';
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { logger } from 'src/lib/logger';
import { db } from 'src/lib/db'

import faktory from 'faktory-worker'

import { createCipheriv, randomBytes } from 'crypto'


export const OPERATIONS = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
}

export const OPERATIONS_PER_HTTPMETHOD = {
  PUT: "create",
  POST: "update",
  DELETE: "delete",
}
// const encrypter = crypto.createHmac('sha1', process.env.RELAY_CLIENT_SECRET);

//@ts-ignore
const CREATE_MESSAGE_QUERY = gql`
  mutation createMessageFromClient($operation: String!, $entity: String!, $payload: String!) {
    createMessageFromClient(operation: $operation, entity: $entity, payload: $payload) {
      id
    }
  }
`
export const propagateMessage = async (operation, entity, payload) => {
  // Envoi dans la file de traitement
  const client = await faktory.connect()
  const job = client.job('sendMessage', operation, entity, payload)
  job.queue = process.env.FAKTORY_QUEUE
  await job.push();  await client.close()
  return;
}
export const sendMessage = (operation, entity, payload) => {
  const message = JSON.stringify(payload);

  // encrypter.update(message);
  // const encryptedMessage = encrypter.digest('hex');;
  //Encryption also has an initialization vector (IV) to randomize the pattern so a sequence of text won’t produce the same output as a previous sequence.
  // const iv = randomBytes(16);
  // const cipher = createCipheriv('aes256', Buffer.from(process.env.RELAY_CLIENT_SECRET, 'hex'), Buffer.from(process.env.RELAY_CLIENT_TOKEN, 'hex'));
  // const cipher = createCipheriv('aes256', Buffer.from(process.env.RELAY_CLIENT_SECRET, 'hex'), iv);
  // const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

  //Pour éviter les erreur d'analyse
  // const remote_gql = gql;
  let relayClient
  try {

    //Création du client Apollo vers le relai
    const httpLink = createHttpLink({
      uri: `${process.env.RELAY_URL}/graphql`,
      fetch
    });

    const authLink = setContext((_, { headers }) => {
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: process.env.RELAY_CLIENT_TOKEN ? `Bearer ${process.env.RELAY_CLIENT_TOKEN}` : "",
        }
      }
    });

    relayClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });

    logger.debug({custom: message}, 'Message envoyé au relai')
    relayClient.mutate({ mutation: CREATE_MESSAGE_QUERY, variables : { operation, entity, payload: message }})
  } catch (error) {
    logger.error(error)
  }
}

export const handleMessage = async (operation, message) => {
  const { instance, entity, payload } = message;
  if (!entity)
    throw Error(`Message reçu du relai sans entity : ${entity}, ${payload}`)

  //Vérification de l'existence de l'entité
  const prismaEntity = db[entity]

  //Si l'entité n'existe pas en local, exit
  if (!prismaEntity)
    throw Error(`Message reçu du relai sur une entité inexistante : ${entity}, ${payload}`)

  if (!payload)
    throw Error(`Message reçu du relai sans payload : ${entity}, ${payload}`)

  if (!instance)
    throw Error(`Message reçu du relai sans instance : ${instance}, ${payload}`)

  //Vérification de la présence de l'instance distante en local
  let localInstance = await db.instance.findUnique({where: {host : instance.host}, select: {id: true}})
  //Création si inexistante
  if(!localInstance){
    logger.debug({ custom : instance }, "Création de l'instance")
    localInstance = await db.instance.create({ data: { host: instance.host, version: instance.version }})
  }

  //Transformation du payload pour que les connexions de relations par cuid soient transformées en connect
  let _data = transformPayload(payload, localInstance, operation);
  logger.debug({ custom: _data }, "Payload transformé")

  logger.debug({_data, entity, operation, localInstance}, "Opération sur entité depuis relai")
  const result = await prismaEntity[operation](_data).catch(err => {
    logger.error(err)
    throw Error(`Erreur d'enregistrement Prisma ${err}`)
  });

  return result;
}

/**
 * @example
 * {
 *   "id": 4,
 *   "cuid": "clcgjnrvd0000v5rm2q32hrsj",
 *   ...
 *   "practices": [
 *     {
 *       "cuid": "clcghc12i00013b6kvzv6ypt8"
 *     },
 *     {
 *       "cuid": "clcghc12i00043b6k5h2a2y10"
 *     },
 *     {
 *       "cuid": "clcghc12i00063b6k78scm404"
 *     }
 *   ],
 *   "organization": {
 *     "cuid": "clcgjdj9w0003v5r05c8qed1b"
 *   }
 *}
 * @param {*} payload
 * @returns
 */
const transformPayload = (payload, localInstance, operation) => {
  //Deep clone
  let _payload = JSON.parse(JSON.stringify(payload));

  for (const key in payload) {
    if (Object.hasOwnProperty.call(payload, key)) {
      const element = payload[key];
      //Si on est dans le cas d'un tableau ou d'un objet, c'est qu'on traite une relation
      //Attention : null est un object
      if(!!element && typeof element == "object"){
        //On modifie le payload cloné pour utiliser la syntaxe prisma de connexion
        if(Array.isArray(element))
          _payload[key] = {connect: element.map(relation => ({cuid: relation.cuid}))}
        else
          _payload[key] = {connect: {cuid: element.cuid}}
        //Suppression préemptive d'un scalar qui trainerait (organizationId, je te regarde)
        delete _payload[`${key}Id`]
      }
    }
  }
  //Suppression préemptive de l'id, dont on ne se servira jamais, puisqu'on cible par cuid
  delete _payload.id
  //Remplacement de l'instanceId dans l'objet, qui va être transformé en {connect :id} par foreignKeyReplacement
  _payload.instanceId = localInstance.id;
  _payload = foreignKeyReplacement(_payload);
  let _data = { data: _payload }

  //Gestion de l'opération
  if (operation == OPERATIONS.UPDATE) {
    _data.where = { cuid: payload.cuid };
  }

  if (operation == OPERATIONS.DELETE) {
    _data.where = { cuid: payload.cuid };
    delete _data.data;
  }
  return _data;
}

//Eviter le mix de foreignKey directe et de connect, on met tout en connect
export const foreignKeyReplacement = (input) => {
  let output = input
  const foreignKeys = Object.keys(input).filter((k) => k.match(/Id$/))

  foreignKeys.forEach((key) => {
    const modelName = key.replace(/Id$/, '')
    const value = input[key]

    delete output[key]
    //Si null, on ne fait rien
    if(value)
      output = Object.assign(output, {
        [modelName]: { connect: { id: value } },
      })
  })

  return output
}