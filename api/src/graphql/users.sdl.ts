export const schema = gql`
  type User {
    id: Int!
    cuid: String!
    idv1: String
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    image: String
    name: String
    surname: String
    phone: String
    showEmail: Boolean
    showPhone: Boolean
    job: String
    department: String
    shortPresentation: String
    presentation: String
    subjects: String
    organization: Organization!
    organizationId: Int!
    organizationsAuthored: [Organization]!
    practices: [Practice]!
    instance: Instance
    instanceId: Int
    initiativesAuthored: [Initiative]!
    initiativesMembered: [Initiative]!
    networkAuthored: [Initiative]!
  }

  type Query {
    users: [User!]! @skipAuth
    usersWithQuery(query: String): [User!]! @skipAuth
    similarUsers(id: Int!): [User!]! @skipAuth
    user(id: Int!): User @skipAuth
  }

  input CreateUserInput {
    email: String!
    cuid: String
    image: String
    name: String
    surname: String
    phone: String
    showEmail: Boolean
    showPhone: Boolean
    job: String
    department: String
    shortPresentation: String
    presentation: String
    subjects: String
    practices: [Int]!
    organizationId: Int!
    instanceId: Int
  }

  input UpdateUserInput {
    email: String
    image: String
    name: String
    surname: String
    phone: String
    showEmail: Boolean
    showPhone: Boolean
    job: String
    department: String
    shortPresentation: String
    presentation: String
    subjects: String
    organizationId: Int
    practices: [Int]!
    instanceId: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
