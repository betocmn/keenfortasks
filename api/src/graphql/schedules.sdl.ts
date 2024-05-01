export const schema = gql`
  type Schedule {
    id: String!
    accountId: Int!
    agentId: Int!
    startTime: DateTime!
    endTime: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    Account: Account!
    Agent: Agent!
    Task: [Task]!
  }

  type Query {
    schedules: [Schedule!]! @requireAuth
    schedule(id: String!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    accountId: Int!
    agentId: Int!
    startTime: DateTime!
    endTime: DateTime!
  }

  input UpdateScheduleInput {
    accountId: Int
    agentId: Int
    startTime: DateTime
    endTime: DateTime
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @skipAuth
    updateSchedule(id: String!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: String!): Schedule! @requireAuth
  }
`
