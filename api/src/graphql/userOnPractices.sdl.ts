export const schema = gql`
  type UserOnPractice {
    id: Int!
    user: User!
    userId: Int!
    practice: Practice!
    practiceId: Int!
  }

  type Query {
    userOnPractices: [UserOnPractice!]! @requireAuth
    userOnPractice(id: Int!): UserOnPractice @requireAuth
  }

  input CreateUserOnPracticeInput {
    userId: Int!
    practiceId: Int!
  }

  input UpdateUserOnPracticeInput {
    userId: Int
    practiceId: Int
  }

  type Mutation {
    createUserOnPractice(input: CreateUserOnPracticeInput!): UserOnPractice!
      @requireAuth
    updateUserOnPractice(
      id: Int!
      input: UpdateUserOnPracticeInput!
    ): UserOnPractice! @requireAuth
    deleteUserOnPractice(id: Int!): UserOnPractice! @requireAuth
  }
`
