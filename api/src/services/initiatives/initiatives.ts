import type {
  QueryResolvers,
  MutationResolvers,
  InitiativeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const initiatives: QueryResolvers['initiatives'] = () => {
  return db.initiative.findMany()
}

export const initiativesWithQuery: QueryResolvers['initiativesWithQuery'] = ({ query }) => {
  return db.initiative.findMany({
    where: {
      OR: [
        {title: {contains: query, mode: 'insensitive'}},
        {contact: {contains: query, mode: 'insensitive'}},
        {descriptionMD: {contains: query, mode: 'insensitive'}},
        {author: { name: {contains: query, mode: 'insensitive'}}}
      ]
    }
  })
}

export const initiative: QueryResolvers['initiative'] = ({ id }) => {
  return db.initiative.findUnique({
    where: { id },
  })
}

export const similarInitiatives: QueryResolvers['similarInitiatives'] = async ({ id }) => {
  return db.$queryRaw`
    SELECT *
    FROM public."Initiative"
    WHERE id != ${id} -- Exclure l'initiative actuelle
    ORDER BY (
      SELECT COUNT(*)
      FROM public."_InitiativePractices" AS ip1
      JOIN public."_InitiativePractices" AS ip2 ON ip1."B" = ip2."B"
      WHERE ip1."A" = public."Initiative"."id"
      AND ip2."A" = ${id} -- ID de l'initiative actuelle
    ) DESC
    LIMIT 5 -- Limiter le nombre de similarités retournées
  `;
}

export const createInitiative: MutationResolvers['createInitiative'] = ({
  input,
}) => {
  return db.initiative.create({
    data: input,
  })
}

export const updateInitiative: MutationResolvers['updateInitiative'] = ({
  id,
  input,
}) => {
  return db.initiative.update({
    data: input,
    where: { id },
  })
}

export const deleteInitiative: MutationResolvers['deleteInitiative'] = ({
  id,
}) => {
  return db.initiative.delete({
    where: { id },
  })
}

export const Initiative: InitiativeRelationResolvers = {
  tags: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).tags()
  },
  subjects: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).subjects()
  },
  levels: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).levels()
  },
  resources: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).resources()
  },
  competences: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).competences()
  },
  networks: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).networks()
  },
  sponsors: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).sponsors()
  },
  users: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).users()
  },
  organizations: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).organizations()
  },
  author: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).author()
  },
  practices: (_obj, { root }) => {
    return db.initiative.findUnique({ where: { id: root?.id } }).practices()
  },
}
