import type { Prisma, Schedule } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ScheduleCreateArgs>({
  schedule: {
    one: {
      data: {
        startTime: '2024-04-30T11:29:43.765Z',
        endTime: '2024-04-30T11:29:43.765Z',
        updatedAt: '2024-04-30T11:29:43.765Z',
        Account: {
          create: { name: 'String', updatedAt: '2024-04-30T11:29:43.765Z' },
        },
        Agent: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String8394448',
            updatedAt: '2024-04-30T11:29:43.765Z',
            Account: {
              create: { name: 'String', updatedAt: '2024-04-30T11:29:43.765Z' },
            },
          },
        },
      },
    },
    two: {
      data: {
        startTime: '2024-04-30T11:29:43.765Z',
        endTime: '2024-04-30T11:29:43.765Z',
        updatedAt: '2024-04-30T11:29:43.765Z',
        Account: {
          create: { name: 'String', updatedAt: '2024-04-30T11:29:43.765Z' },
        },
        Agent: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String7269523',
            updatedAt: '2024-04-30T11:29:43.765Z',
            Account: {
              create: { name: 'String', updatedAt: '2024-04-30T11:29:43.765Z' },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Schedule, 'schedule'>
