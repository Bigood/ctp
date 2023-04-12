export const schema = gql`
  type Competence {
    id: Int!
    name: String!
    url: String
    type: TypeCompetence!
    initiatives: [Initiative]!
  }

  enum TypeCompetence {
    DISCIPLINARY
    TRANSVERSAL
  }

  type Query {
    competences: [Competence!]! @requireAuth
    competence(id: Int!): Competence @requireAuth
  }

  input CreateCompetenceInput {
    name: String!
    url: String
    type: TypeCompetence!
  }

  input UpdateCompetenceInput {
    name: String
    url: String
    type: TypeCompetence
  }

  type Mutation {
    createCompetence(input: CreateCompetenceInput!): Competence! @requireAuth
    updateCompetence(id: Int!, input: UpdateCompetenceInput!): Competence!
      @requireAuth
    deleteCompetence(id: Int!): Competence! @requireAuth
  }
`
