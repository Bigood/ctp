import type {
  QueryResolvers,
  MutationResolvers,
  PracticeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const practices: QueryResolvers['practices'] = () => {
  return db.practice.findMany()
}

export const practice: QueryResolvers['practice'] = ({ id }) => {
  return db.practice.findUnique({
    where: { id },
  })
}

export const createPractice: MutationResolvers['createPractice'] = ({
  input,
}) => {
  return db.practice.create({
    data: input,
  })
}

export const updatePractice: MutationResolvers['updatePractice'] = ({
  id,
  input,
}) => {
  return db.practice.update({
    data: input,
    where: { id },
  })
}

export const deletePractice: MutationResolvers['deletePractice'] = ({ id }) => {
  return db.practice.delete({
    where: { id },
  })
}

export const Practice: PracticeRelationResolvers = {
  users: (_obj, { root }) => {
    return db.practice.findUnique({ where: { id: root?.id } }).users()
  },
}
