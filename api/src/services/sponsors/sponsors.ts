import type {
  QueryResolvers,
  MutationResolvers,
  SponsorRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const sponsors: QueryResolvers['sponsors'] = () => {
  return db.sponsor.findMany()
}

export const sponsor: QueryResolvers['sponsor'] = ({ id }) => {
  return db.sponsor.findUnique({
    where: { id },
  })
}

export const createSponsor: MutationResolvers['createSponsor'] = ({
  input,
}) => {

  return db.sponsor.create({
    data: input,
  })
}

export const updateSponsor: MutationResolvers['updateSponsor'] = ({
  id,
  input,
}) => {
  return db.sponsor.update({
    data: input,
    where: { id },
  })
}

export const deleteSponsor: MutationResolvers['deleteSponsor'] = ({ id }) => {
  return db.sponsor.delete({
    where: { id },
  })
}

export const Sponsor: SponsorRelationResolvers = {
  initiatives: (_obj, { root }) => {
    return db.sponsor.findUnique({ where: { id: root?.id } }).initiatives()
  },
}
