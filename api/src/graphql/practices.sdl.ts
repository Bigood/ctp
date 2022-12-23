export const schema = gql`
  type Practice {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    synonym: [String]!
    description: String
    shortDescription: String
    sources: [String]!
    users: [User]!
  }

  type Query {
    practices: [Practice!]! @requireAuth
    practice(id: Int!): Practice @requireAuth
  }

  input CreatePracticeInput {
    name: String!
    synonym: [String]!
    description: String
    shortDescription: String
    sources: [String]!
  }

  input UpdatePracticeInput {
    name: String
    synonym: [String]!
    description: String
    shortDescription: String
    sources: [String]!
  }

  type Mutation {
    createPractice(input: CreatePracticeInput!): Practice! @requireAuth
    updatePractice(id: Int!, input: UpdatePracticeInput!): Practice!
      @requireAuth
    deletePractice(id: Int!): Practice! @requireAuth
  }
`
