import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'
import faktory from "faktory-worker"

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { createDiasporaProfile, updateDiasporaProfile } from '../diaspora/diaspora'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = async ({ input }) => {
  const dbUser = await db.user.create({
    data: input,
  })

  logger.info({ custom: { input, dbUser } }, `postSignup with`)
  await createDiasporaProfile({ body: input, user_type: "user", id: dbUser.id })
  // The, send our task to the Faktory server
  // const client = await faktory.connect()
  // await client.job('postSignup', { body: input, user_type :"user", id: dbUser.id}).push()
  // await client.close()
  return dbUser;
}

export const updateUser: MutationResolvers['updateUser'] = async ({ id, input }) => {
  //https://redwoodjs.com/docs/logger#with-a-custom-payload
  logger.debug({ custom: { id, input } }, 'postEditUser with')
  await updateDiasporaProfile({ body: input, user_type: "user", id: id })

  // const client = await faktory.connect()
  // await client.job('postEditUser', { body: input, user_type: "user", id: id }).push()
  // await client.close()
  return db.user.update({
    data: input,
    where: { id },
  })

}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
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
}
