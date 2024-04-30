export const schema = gql`
  type Account {
    id: Int!
    name: String!
    url: String
    timezone: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    Agent: [Agent]!
    Schedule: [Schedule]!
    Task: [Task]!
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: Int!): Account @requireAuth
  }
`
