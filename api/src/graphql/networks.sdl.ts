export const schema = gql`
  type Network {
    id: Int!
    name: String!
    url: String
    logo: String
    author: User
    authorId: Int
    initiatives: [Initiative]!
  }

  type Query {
    networks: [Network!]! @requireAuth
    network(id: Int!): Network @requireAuth
  }

  input CreateNetworkInput {
    name: String!
    url: String
    logo: String
    authorId: Int
  }

  input UpdateNetworkInput {
    name: String
    url: String
    logo: String
    authorId: Int
  }

  type Mutation {
    createNetwork(input: CreateNetworkInput!): Network! @requireAuth
    updateNetwork(id: Int!, input: UpdateNetworkInput!): Network! @requireAuth
    deleteNetwork(id: Int!): Network! @requireAuth
  }
`
