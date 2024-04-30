import type { QueryResolvers, AgentRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const agents: QueryResolvers['agents'] = () => {
  return db.agent.findMany()
}

export const agent: QueryResolvers['agent'] = ({ id }) => {
  return db.agent.findUnique({
    where: { id },
  })
}

export const Agent: AgentRelationResolvers = {
  Account: (_obj, { root }) => {
    return db.agent.findUnique({ where: { id: root?.id } }).Account()
  },
  Schedule: (_obj, { root }) => {
    return db.agent.findUnique({ where: { id: root?.id } }).Schedule()
  },
}
