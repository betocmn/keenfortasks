import type { Prisma, Task } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        startTime: '2024-04-30T11:23:38.125Z',
        duration: 4532351,
        type: 'break',
        updatedAt: '2024-04-30T11:23:38.125Z',
        Schedule: {
          create: {
            startTime: '2024-04-30T11:23:38.125Z',
            endTime: '2024-04-30T11:23:38.125Z',
            updatedAt: '2024-04-30T11:23:38.125Z',
            Account: {
              create: { name: 'String', updatedAt: '2024-04-30T11:23:38.125Z' },
            },
            Agent: {
              create: {
                firstName: 'String',
                lastName: 'String',
                email: 'String1444019',
                updatedAt: '2024-04-30T11:23:38.125Z',
                Account: {
                  create: {
                    name: 'String',
                    updatedAt: '2024-04-30T11:23:38.125Z',
                  },
                },
              },
            },
          },
        },
        Account: {
          create: { name: 'String', updatedAt: '2024-04-30T11:23:38.125Z' },
        },
      },
    },
    two: {
      data: {
        startTime: '2024-04-30T11:23:38.125Z',
        duration: 5126164,
        type: 'break',
        updatedAt: '2024-04-30T11:23:38.125Z',
        Schedule: {
          create: {
            startTime: '2024-04-30T11:23:38.125Z',
            endTime: '2024-04-30T11:23:38.125Z',
            updatedAt: '2024-04-30T11:23:38.125Z',
            Account: {
              create: { name: 'String', updatedAt: '2024-04-30T11:23:38.125Z' },
            },
            Agent: {
              create: {
                firstName: 'String',
                lastName: 'String',
                email: 'String3467512',
                updatedAt: '2024-04-30T11:23:38.125Z',
                Account: {
                  create: {
                    name: 'String',
                    updatedAt: '2024-04-30T11:23:38.125Z',
                  },
                },
              },
            },
          },
        },
        Account: {
          create: { name: 'String', updatedAt: '2024-04-30T11:23:38.125Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
