import type { Prisma, Task } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        startTime: '2024-07-30T11:23:38.125Z',
        duration: 3600, // 1 hour in seconds
        endTime: '2024-07-30T12:23:38.125Z',
        type: 'break',
        Schedule: {
          create: {
            startTime: '2024-07-30T10:00:00.000Z',
            endTime: '2024-07-30T18:00:00.000Z',
            Account: {
              create: {
                name: 'String',
              },
            },
            Agent: {
              create: {
                firstName: 'String',
                lastName: 'String',
                email: 'String1444019',
                Account: {
                  create: {
                    name: 'String',
                  },
                },
              },
            },
          },
        },
        Account: {
          create: {
            name: 'String',
          },
        },
      },
    },
    two: {
      data: {
        startTime: '2024-09-25T14:00:00.000Z',
        duration: 7200, // 2 hours in seconds
        endTime: '2024-09-25T16:00:00.000Z',
        type: 'break',
        Schedule: {
          create: {
            startTime: '2024-09-25T10:00:00.000Z',
            endTime: '2024-09-30T18:00:00.000Z',
            Account: {
              create: {
                name: 'String',
              },
            },
            Agent: {
              create: {
                firstName: 'String',
                lastName: 'String',
                email: 'String3467512',
                Account: {
                  create: {
                    name: 'String',
                  },
                },
              },
            },
          },
        },
        Account: {
          create: {
            name: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
