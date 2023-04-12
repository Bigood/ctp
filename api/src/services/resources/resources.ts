import type {
  QueryResolvers,
  MutationResolvers,
  ResourceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const resources: QueryResolvers['resources'] = () => {
  return db.resource.findMany()
}

export const resource: QueryResolvers['resource'] = ({ id }) => {
  return db.resource.findUnique({
    where: { id },
  })
}

export const createResource: MutationResolvers['createResource'] = ({
  input,
}) => {
  return db.resource.create({
    data: input,
  })
}

export const updateResource: MutationResolvers['updateResource'] = ({
  id,
  input,
}) => {
  return db.resource.update({
    data: input,
    where: { id },
  })
}

export const deleteResource: MutationResolvers['deleteResource'] = ({ id }) => {
  return db.resource.delete({
    where: { id },
  })
}

export const Resource: ResourceRelationResolvers = {
  initiatives: (_obj, { root }) => {
    return db.resource.findUnique({ where: { id: root?.id } }).initiatives()
  },
}
