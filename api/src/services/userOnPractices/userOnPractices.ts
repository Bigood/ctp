import type {
  QueryResolvers,
  MutationResolvers,
  UserOnPracticeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userOnPractices: QueryResolvers['userOnPractices'] = () => {
  return db.userOnPractice.findMany()
}

export const userOnPractice: QueryResolvers['userOnPractice'] = ({ id }) => {
  return db.userOnPractice.findUnique({
    where: { id },
  })
}

export const createUserOnPractice: MutationResolvers['createUserOnPractice'] =
  ({ input }) => {
    return db.userOnPractice.create({
      data: input,
    })
  }

export const updateUserOnPractice: MutationResolvers['updateUserOnPractice'] =
  ({ id, input }) => {
    return db.userOnPractice.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserOnPractice: MutationResolvers['deleteUserOnPractice'] =
  ({ id }) => {
    return db.userOnPractice.delete({
      where: { id },
    })
  }

export const UserOnPractice: UserOnPracticeRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userOnPractice.findUnique({ where: { id: root?.id } }).user()
  },
  practice: (_obj, { root }) => {
    return db.userOnPractice.findUnique({ where: { id: root?.id } }).practice()
  },
}
