import type { Prisma, Account } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: { data: { name: 'String', updatedAt: '2024-04-30T10:44:52.512Z' } },
    two: { data: { name: 'String', updatedAt: '2024-04-30T10:44:52.512Z' } },
  },
})

export type StandardScenario = ScenarioData<Account, 'account'>
