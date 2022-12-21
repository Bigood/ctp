import fetch from 'cross-fetch';
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { logger } from 'src/lib/logger';

import { createCipheriv, randomBytes } from 'crypto'


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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

//@ts-ignore
const CREATE_MESSAGE_QUERY = gql`
  mutation createMessageFromClient($payload: String!) {
    createMessageFromClient(payload: $payload) {
      id
    }
  }
`
export const createMessage = (payload) => {
  const message = JSON.stringify(payload);

  // encrypter.update(message);
  // const encryptedMessage = encrypter.digest('hex');;
  //Encryption also has an initialization vector (IV) to randomize the pattern so a sequence of text won’t produce the same output as a previous sequence.
  // const iv = randomBytes(16);
  const cipher = createCipheriv('aes256', Buffer.from(process.env.RELAY_CLIENT_SECRET, 'hex'), Buffer.from(process.env.RELAY_CLIENT_TOKEN, 'hex'));
  // const cipher = createCipheriv('aes256', Buffer.from(process.env.RELAY_CLIENT_SECRET, 'hex'), iv);
  const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

  logger.debug({custom: encryptedMessage}, 'Message envoyé au relai')
  client.mutate({ mutation: CREATE_MESSAGE_QUERY, variables : { payload : encryptedMessage }})
}