import type {
  QueryResolvers,
  MutationResolvers,
  NetworkRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const networks: QueryResolvers['networks'] = () => {
  return db.network.findMany()
}

export const network: QueryResolvers['network'] = ({ id }) => {
  return db.network.findUnique({
    where: { id },
  })
}

export const createNetwork: MutationResolvers['createNetwork'] = ({
  input,
}) => {
  return db.network.create({
    data: input,
  })
}

export const updateNetwork: MutationResolvers['updateNetwork'] = ({
  id,
  input,
}) => {
  return db.network.update({
    data: input,
    where: { id },
  })
}

export const deleteNetwork: MutationResolvers['deleteNetwork'] = ({ id }) => {
  return db.network.delete({
    where: { id },
  })
}

export const Network: NetworkRelationResolvers = {
  author: (_obj, { root }) => {
    return db.network.findUnique({ where: { id: root?.id } }).author()
  },
  initiatives: (_obj, { root }) => {
    return db.network.findUnique({ where: { id: root?.id } }).initiatives()
  },
}
