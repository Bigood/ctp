export const schema = gql`
  type Instance {
    id: Int!
    token: String!
    host: String!
    secret: String!
    version: String
    createdAt: DateTime!
    updatedAt: DateTime!

    users: [User]
  }

  type Query {
    instances: [Instance!]! @requireAuth
    instance(id: Int!): Instance @requireAuth
  }
`
