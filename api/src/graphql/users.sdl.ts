export const schema = gql`
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }
`
