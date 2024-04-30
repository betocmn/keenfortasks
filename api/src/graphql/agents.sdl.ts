export const schema = gql`
  type Agent {
    id: Int!
    accountId: Int!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    Account: Account!
    Schedule: [Schedule]!
  }

  type Query {
    agents: [Agent!]! @requireAuth
    agent(id: Int!): Agent @requireAuth
  }
`
