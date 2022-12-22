import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const instances: QueryResolvers['instances'] = () => {
  return db.instance.findMany()
}

export const instance: QueryResolvers['instance'] = ({ id }) => {
  return db.instance.findUnique({
    where: { id },
  })
}
