import fetch from 'cross-fetch';
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { logger } from 'src/lib/logger';
import { db } from 'src/lib/db'

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

//Pour éviter les erreur d'analyse
// const remote_gql = gql;

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

const relayClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

//@ts-ignore
const CREATE_MESSAGE_QUERY = gql`
  mutation createMessageFromClient($operation: String!, $entity: String!, $payload: String!) {
    createMessageFromClient(operation: $operation, entity: $entity, payload: $payload) {
      id
    }
  }
`
export const createMessage = (operation, entity, payload) => {
  const message = JSON.stringify(payload);

  // encrypter.update(message);
  // const encryptedMessage = encrypter.digest('hex');;
  //Encryption also has an initialization vector (IV) to randomize the pattern so a sequence of text won’t produce the same output as a previous sequence.
  // const iv = randomBytes(16);
  // const cipher = createCipheriv('aes256', Buffer.from(process.env.RELAY_CLIENT_SECRET, 'hex'), Buffer.from(process.env.RELAY_CLIENT_TOKEN, 'hex'));
  // const cipher = createCipheriv('aes256', Buffer.from(process.env.RELAY_CLIENT_SECRET, 'hex'), iv);
  // const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

  logger.debug({custom: message}, 'Message envoyé au relai')
  relayClient.mutate({ mutation: CREATE_MESSAGE_QUERY, variables : { operation, entity, payload: message }})
}

export const handleMessage = async (operation, {instance, entity, payload}) => {

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

  const { practices, ...__payload } = payload;
  let _data = {
    data: {
      ...__payload,
      instanceId : localInstance.id

    }
  }
  if (operation == OPERATIONS.UPDATE){
    _data.where = { email: payload.email};
    delete _data.data.id;
  }

  if (operation == OPERATIONS.DELETE) {
    _data.where = { email: payload.email };
    delete _data.data;
  }
  logger.debug({_data, entity, operation, localInstance}, "Opération sur entité depuis relai")
  const result = await prismaEntity[operation](_data).catch(err => {throw Error(`Erreur d'enregistrement Prisma ${err}`)});

  return result;
}