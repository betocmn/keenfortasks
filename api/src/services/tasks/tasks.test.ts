import { advanceTo, clear } from 'jest-date-mock'

import { tasks, task, createTask, updateTask, deleteTask } from './tasks'
import type { StandardScenario } from './tasks.scenarios'

describe('tasks', () => {
  beforeEach(() => {
    advanceTo(new Date('2024-01-01T00:00:00.000Z'))
  })

  afterEach(() => {
    clear()
  })

  /** 1. UNIT TESTS ***/

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
        startTime: '2024-09-26T15:00:00.000Z',
        duration: 3600, // 1 hour in seconds
        type: 'break',
      },
    })
    expect(result.accountId).toEqual(scenario.task.two.accountId)
    expect(result.scheduleId).toEqual(scenario.task.two.scheduleId)
    expect(result.startTime).toEqual(new Date('2024-09-26T15:00:00.000Z'))
    expect(result.duration).toEqual(3600)
    expect(result.type).toEqual('break')
  })

  scenario('updates a task', async (scenario: StandardScenario) => {
    const original = await task({ id: scenario.task.one.id })
    const result = await updateTask({
      id: original.id,
      input: {
        startTime: '2024-07-30T12:00:00.000Z',
        duration: 1800, // 30 minutes in seconds
      },
    })
    expect(result.startTime).toEqual(new Date('2024-07-30T12:00:00.000Z'))
    expect(result.duration).toEqual(1800)
  })

  scenario('deletes a task', async (scenario: StandardScenario) => {
    const original = await deleteTask({ id: scenario.task.one.id })
    const result = await task({ id: original.id })
    expect(result).toEqual(null)
  })

  scenario(
    'fails to create a task when start time is outside schedule boundaries',
    async (scenario: StandardScenario) => {
      try {
        await createTask({
          input: {
            accountId: scenario.task.two.accountId,
            scheduleId: scenario.task.two.scheduleId,
            startTime: '2024-04-30T09:00:00.000Z', // Outside schedule boundaries
            duration: 3600, // 1 hour in seconds
            type: 'break',
          },
        })
        throw new Error('Expected a validation error')
      } catch (error) {
        expect(error.message).toContain(
          'The task must fall within the schedule boundaries.'
        )
      }
    }
  )

  scenario(
    'fails to create a task when end time is outside schedule boundaries',
    async (scenario: StandardScenario) => {
      try {
        await createTask({
          input: {
            accountId: scenario.task.two.accountId,
            scheduleId: scenario.task.two.scheduleId,
            startTime: '2024-04-30T17:00:00.000Z',
            duration: 7200, // 2 hours in seconds, pushing the end time outside schedule boundaries
            type: 'break',
          },
        })
        throw new Error('Expected a validation error')
      } catch (error) {
        expect(error.message).toContain(
          'The task must fall within the schedule boundaries.'
        )
      }
    }
  )

  scenario(
    'fails to create a task when it overlaps with an existing task',
    async (scenario: StandardScenario) => {
      try {
        await createTask({
          input: {
            accountId: scenario.task.two.accountId,
            scheduleId: scenario.task.two.scheduleId,
            startTime: '2024-09-25T15:30:00.000Z', // Overlaps with task.two
            duration: 3600, // 1 hour in seconds
            type: 'break',
          },
        })
        throw new Error('Expected a validation error')
      } catch (error) {
        expect(error.message).toContain(
          'The task overlaps with an existing task.'
        )
      }
    }
  )
})
