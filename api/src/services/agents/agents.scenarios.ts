import type { Prisma, Agent } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AgentCreateArgs>({
  agent: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        email: 'String5674995',
        updatedAt: '2024-04-30T10:43:01.363Z',
        Account: {
          create: { name: 'String', updatedAt: '2024-04-30T10:43:01.363Z' },
        },
      },
    },
    two: {
      data: {
        firstName: 'String',
        lastName: 'String',
        email: 'String3526694',
        updatedAt: '2024-04-30T10:43:01.363Z',
        Account: {
          create: { name: 'String', updatedAt: '2024-04-30T10:43:01.363Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Agent, 'agent'>
