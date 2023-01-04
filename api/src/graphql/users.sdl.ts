export const schema = gql`
  type User {
    id: Int!
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    name: String
    surname: String
    organization: Organization!
    organizationId: Int
    organizationsAuthored: [Organization]!
    practices: [Practice]!

    instance: Instance
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    surname: String
    organizationId: Int
    practices: [Int]!
  }

  input UpdateUserInput {
    email: String
    name: String
    surname: String
    organizationId: Int
    practices: [Int]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
