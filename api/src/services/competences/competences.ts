import type {
  QueryResolvers,
  MutationResolvers,
  CompetenceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const competences: QueryResolvers['competences'] = () => {
  return db.competence.findMany()
}

export const competence: QueryResolvers['competence'] = ({ id }) => {
  return db.competence.findUnique({
    where: { id },
  })
}

export const createCompetence: MutationResolvers['createCompetence'] = ({
  input,
}) => {
  return db.competence.create({
    data: input,
  })
}

export const updateCompetence: MutationResolvers['updateCompetence'] = ({
  id,
  input,
}) => {
  return db.competence.update({
    data: input,
    where: { id },
  })
}

export const deleteCompetence: MutationResolvers['deleteCompetence'] = ({
  id,
}) => {
  return db.competence.delete({
    where: { id },
  })
}

export const Competence: CompetenceRelationResolvers = {
  initiatives: (_obj, { root }) => {
    return db.competence.findUnique({ where: { id: root?.id } }).initiatives()
  },
}
