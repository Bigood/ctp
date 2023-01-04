export const schema = gql`
  type Organization {
    id: Int!
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    author: User
    authorId: Int
    users: [User]!
    name: String!
    address: String
    logo: String
  }

  type Query {
    organizations: [Organization!]! @requireAuth
    organization(id: Int!): Organization @requireAuth
  }

  input CreateOrganizationInput {
    authorId: Int
    name: String!
    address: String
    logo: String
  }

  input UpdateOrganizationInput {
    authorId: Int
    name: String
    address: String
    logo: String
  }

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
      @requireAuth
    updateOrganization(
      id: Int!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth
    deleteOrganization(id: Int!): Organization! @requireAuth
  }
`
