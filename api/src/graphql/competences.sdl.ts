export const schema = gql`
  type Competence {
    id: Int!
    name: String!
    url: String
    type: String!
    initiatives: [Initiative]!
  }

  type Query {
    competences: [Competence!]! @requireAuth
    competence(id: Int!): Competence @requireAuth
  }

  input CreateCompetenceInput {
    name: String!
    url: String
    type: String!
  }

  input UpdateCompetenceInput {
    name: String
    url: String
    type: String
  }

  type Mutation {
    createCompetence(input: CreateCompetenceInput!): Competence! @requireAuth
    updateCompetence(id: Int!, input: UpdateCompetenceInput!): Competence!
      @requireAuth
    deleteCompetence(id: Int!): Competence! @requireAuth
  }
`
