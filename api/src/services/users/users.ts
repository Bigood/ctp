import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { propagateMessage, OPERATIONS } from '../../lib/relay'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = async ({ input }) => {
  const {practices, ...data} = input;
  const user = await db.user.create({
    data: {
      ...data,
      practices: {
        //Création de la relation m-n, et pas une connection à une entité existante puisqu'il y a la table intermédiaire
        //https://stackoverflow.com/a/67898001/1437016
        connect: practices.map(id => ({ id: id }))
      }
    },
  })
  propagateMessage(OPERATIONS.CREATE, "user", user);
  return user;
}

export const updateUser: MutationResolvers['updateUser'] = async ({ id, input }) => {
  const { practices, ...data } = input;
  const user = await db.user.update({
    data: {
      ...data,
      practices: {
        //Création de la relation m-n, et pas une connection à une entité existante puisqu'il y a la table intermédiaire
        //https://stackoverflow.com/a/67898001/1437016
        connect: practices.map(id => ({ id: id }))
      }
    },
    where: { id },
  })
  propagateMessage(OPERATIONS.UPDATE, "user", user);
  return user;
}

export const deleteUser: MutationResolvers['deleteUser'] = async ({ id }) => {
  const user = await db.user.delete({
    where: { id },
  })
  propagateMessage(OPERATIONS.DELETE, "user", user);
  return user;
}

export const User: UserRelationResolvers = {
  organization: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).organization()
  },
  organizationsAuthored: (_obj, { root }) => {
    return db.user
      .findUnique({ where: { id: root?.id } })
      .organizationsAuthored()
  },
  practices: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).practices()
  },
  instance: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).instance()
  },
}
