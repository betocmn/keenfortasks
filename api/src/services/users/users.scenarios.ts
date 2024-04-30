import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { email: 'String192463', updatedAt: '2024-04-30T06:47:23.322Z' },
    },
    two: {
      data: { email: 'String3011367', updatedAt: '2024-04-30T06:47:23.322Z' },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
