export const schema = gql`
  type Subject {
    id: Int!
    name: String!
    initiatives: [Initiative]!
  }

  type Query {
    subjects: [Subject!]! @requireAuth
    subject(id: Int!): Subject @requireAuth
  }

  input CreateSubjectInput {
    name: String!
  }

  input UpdateSubjectInput {
    name: String
  }

  type Mutation {
    createSubject(input: CreateSubjectInput!): Subject! @requireAuth
    updateSubject(id: Int!, input: UpdateSubjectInput!): Subject! @requireAuth
    deleteSubject(id: Int!): Subject! @requireAuth
  }
`
