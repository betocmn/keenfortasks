import type { Prisma, Schedule } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ScheduleCreateArgs>({
  schedule: {
    one: {
      data: {
        startTime: '2024-04-30T11:29:43.765Z',
        endTime: '2024-04-30T12:29:43.765Z', // endTime to be after startTime
        Account: {
          create: {
            name: 'String',
          },
        },
        Agent: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String8394448',
            Account: {
              create: {
                name: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        startTime: '2024-04-30T13:29:43.765Z', // startTime to be after the previous schedule's endTime
        endTime: '2024-04-30T14:29:43.765Z', // endTime to be after startTime
        Account: {
          create: {
            name: 'String',
          },
        },
        Agent: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String7269523',
            Account: {
              create: {
                name: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Schedule, 'schedule'>
