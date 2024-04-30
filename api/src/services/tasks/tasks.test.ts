import type { Task } from '@prisma/client'

import { tasks, task, createTask, updateTask, deleteTask } from './tasks'
import type { StandardScenario } from './tasks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tasks', () => {
  scenario('returns all tasks', async (scenario: StandardScenario) => {
    const result = await tasks()

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('returns a single task', async (scenario: StandardScenario) => {
    const result = await task({ id: scenario.task.one.id })

    expect(result).toEqual(scenario.task.one)
  })

  scenario('creates a task', async (scenario: StandardScenario) => {
    const result = await createTask({
      input: {
        accountId: scenario.task.two.accountId,
        scheduleId: scenario.task.two.scheduleId,
        startTime: '2024-04-30T11:23:38.120Z',
        duration: 9277079,
        type: 'break',
      },
    })

    expect(result.accountId).toEqual(scenario.task.two.accountId)
    expect(result.scheduleId).toEqual(scenario.task.two.scheduleId)
    expect(result.startTime).toEqual(new Date('2024-04-30T11:23:38.120Z'))
    expect(result.duration).toEqual(9277079)
    expect(result.type).toEqual('break')
  })

  scenario('updates a task', async (scenario: StandardScenario) => {
    const original = (await task({ id: scenario.task.one.id })) as Task
    const result = await updateTask({
      id: original.id,
      input: { startTime: '2024-05-01T11:23:38.120Z' },
    })

    expect(result.startTime).toEqual(new Date('2024-05-01T11:23:38.120Z'))
  })

  scenario('deletes a task', async (scenario: StandardScenario) => {
    const original = (await deleteTask({ id: scenario.task.one.id })) as Task
    const result = await task({ id: original.id })

    expect(result).toEqual(null)
  })
})
