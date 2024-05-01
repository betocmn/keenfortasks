export const schema = gql`
  type Task {
    id: String!
    accountId: Int!
    scheduleId: String!
    startTime: DateTime!
    endTime: DateTime!
    duration: Int!
    type: TaskType!
    createdAt: DateTime!
    updatedAt: DateTime!
    Schedule: Schedule!
    Account: Account!
  }

  enum TaskType {
    break
    work
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: String!): Task @requireAuth
  }

  input CreateTaskInput {
    accountId: Int!
    scheduleId: String!
    startTime: DateTime!
    duration: Int!
    type: TaskType!
  }

  input UpdateTaskInput {
    accountId: Int
    scheduleId: String
    startTime: DateTime
    duration: Int
    type: TaskType
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @skipAuth
    updateTask(id: String!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: String!): Task! @requireAuth
  }
`
