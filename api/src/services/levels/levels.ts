import type {
  QueryResolvers,
  MutationResolvers,
  LevelRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const levels: QueryResolvers['levels'] = () => {
  return db.level.findMany()
}

export const level: QueryResolvers['level'] = ({ id }) => {
  return db.level.findUnique({
    where: { id },
  })
}

export const createLevel: MutationResolvers['createLevel'] = ({ input }) => {
  return db.level.create({
    data: input,
  })
}

export const updateLevel: MutationResolvers['updateLevel'] = ({
  id,
  input,
}) => {
  return db.level.update({
    data: input,
    where: { id },
  })
}

export const deleteLevel: MutationResolvers['deleteLevel'] = ({ id }) => {
  return db.level.delete({
    where: { id },
  })
}

export const Level: LevelRelationResolvers = {
  initiatives: (_obj, { root }) => {
    return db.level.findUnique({ where: { id: root?.id } }).initiatives()
  },
}
