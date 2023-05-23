export const schema = gql`
  type Initiative {
    id: Int!
    cuid: String!
    idv1: String
    createdAt: DateTime!
    updatedAt: DateTime!
    image: String
    title: String
    outsideUsers: String
    contact: String
    resourcesMD: String
    descriptionMD: String
    conditionsMD: String
    evaluationMD: String
    strengthsMD: String
    transferabilityMD: String
    tags: [Tag]!
    subjects: [Subject]!
    levels: [Level]!
    resources: [Resource]!
    competences: [Competence]!
    networks: [Network]!
    sponsors: [Sponsor]!
    users: [User]!
    organizations: [Organization]!
    author: User!
    authorId: Int!
    practices: [Practice]!
  }

  type Query {
    initiatives: [Initiative!]! @skipAuth
    initiativesWithQuery(query: String): [Initiative!]! @skipAuth
    initiative(id: Int!): Initiative @skipAuth
  }

  input CreateInitiativeInput {
    cuid: String!
    idv1: String
    image: String
    title: String
    outsideUsers: String
    contact: String
    descriptionMD: String
    conditionsMD: String
    evaluationMD: String
    strengthsMD: String
    transferabilityMD: String
    authorId: Int!
  }

  input UpdateInitiativeInput {
    cuid: String
    idv1: String
    image: String
    title: String
    outsideUsers: String
    contact: String
    descriptionMD: String
    conditionsMD: String
    evaluationMD: String
    strengthsMD: String
    transferabilityMD: String
    authorId: Int
  }

  type Mutation {
    createInitiative(input: CreateInitiativeInput!): Initiative! @requireAuth
    updateInitiative(id: Int!, input: UpdateInitiativeInput!): Initiative!
      @requireAuth
    deleteInitiative(id: Int!): Initiative! @requireAuth
  }
`
