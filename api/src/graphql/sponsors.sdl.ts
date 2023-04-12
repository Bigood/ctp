export const schema = gql`
  type Sponsor {
    id: Int!
    name: String!
    url: String
    logo: String
    initiatives: [Initiative]!
  }

  type Query {
    sponsors: [Sponsor!]! @requireAuth
    sponsor(id: Int!): Sponsor @requireAuth
  }

  input CreateSponsorInput {
    name: String!
    url: String
    logo: String
  }

  input UpdateSponsorInput {
    name: String
    url: String
    logo: String
  }

  type Mutation {
    createSponsor(input: CreateSponsorInput!): Sponsor! @requireAuth
    updateSponsor(id: Int!, input: UpdateSponsorInput!): Sponsor! @requireAuth
    deleteSponsor(id: Int!): Sponsor! @requireAuth
  }
`
