import type { QueryResolvers, AccountRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const accounts: QueryResolvers['accounts'] = () => {
  return db.account.findMany()
}

export const account: QueryResolvers['account'] = ({ id }) => {
  return db.account.findUnique({
    where: { id },
  })
}

export const Account: AccountRelationResolvers = {
  Agent: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).Agent()
  },
  Schedule: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).Schedule()
  },
  Task: (_obj, { root }) => {
    return db.account.findUnique({ where: { id: root?.id } }).Task()
  },
}
