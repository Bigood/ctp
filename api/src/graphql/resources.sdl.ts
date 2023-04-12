export const schema = gql`
  type Resource {
    id: Int!
    name: String!
    url: String
    filename: String
    description: String
    initiatives: [Initiative]!
  }

  type Query {
    resources: [Resource!]! @requireAuth
    resource(id: Int!): Resource @requireAuth
  }

  input CreateResourceInput {
    name: String!
    url: String
    filename: String
    description: String
  }

  input UpdateResourceInput {
    name: String
    url: String
    filename: String
    description: String
  }

  type Mutation {
    createResource(input: CreateResourceInput!): Resource! @requireAuth
    updateResource(id: Int!, input: UpdateResourceInput!): Resource!
      @requireAuth
    deleteResource(id: Int!): Resource! @requireAuth
  }
`
