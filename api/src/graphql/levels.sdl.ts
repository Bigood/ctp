export const schema = gql`
  type Level {
    id: Int!
    name: String!
    initiatives: [Initiative]!
  }

  type Query {
    levels: [Level!]! @requireAuth
    level(id: Int!): Level @requireAuth
  }

  input CreateLevelInput {
    name: String!
  }

  input UpdateLevelInput {
    name: String
  }

  type Mutation {
    createLevel(input: CreateLevelInput!): Level! @requireAuth
    updateLevel(id: Int!, input: UpdateLevelInput!): Level! @requireAuth
    deleteLevel(id: Int!): Level! @requireAuth
  }
`
