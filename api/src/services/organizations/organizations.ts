import type {
  QueryResolvers,
  MutationResolvers,
  OrganizationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { OPERATIONS, propagateMessage } from 'src/lib/relay'

export const organizations: QueryResolvers['organizations'] = () => {
  return db.organization.findMany()
}

export const organization: QueryResolvers['organization'] = ({ id }) => {
  return db.organization.findUnique({
    where: { id },
  })
}

export const createOrganization: MutationResolvers['createOrganization'] = async ({ input, }) => {
  const organization = await db.organization.create({
    data: input,
  })
  propagateMessage(OPERATIONS.CREATE, "organization", organization);
  return organization;
}

export const updateOrganization: MutationResolvers['updateOrganization'] = async ({ id, input, }) => {
  const organization = await db.organization.update({
    data: input,
    where: { id },
  })
  propagateMessage(OPERATIONS.UPDATE, "organization", organization);
  return organization;
}

export const deleteOrganization: MutationResolvers['deleteOrganization'] = async ({ id, }) => {
  const organization = await db.organization.delete({
    where: { id },
  })
  propagateMessage(OPERATIONS.DELETE, "organization", organization);
  return organization;
}

export const Organization: OrganizationRelationResolvers = {
  author: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).author()
  },
  users: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).users()
  },
}
