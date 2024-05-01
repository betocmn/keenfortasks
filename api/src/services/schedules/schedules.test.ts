import { advanceTo, clear } from 'jest-date-mock'

import {
  schedules,
  schedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from './schedules'
import type { StandardScenario } from './schedules.scenarios'

describe('schedules', () => {
  beforeEach(() => {
    advanceTo(new Date('2024-01-01T00:00:00.000Z')) // Freeze time to a specific date before each test
  })

  afterEach(() => {
    clear() // Clear the mocked date after each test
  })

  scenario('returns all schedules', async (scenario: StandardScenario) => {
    const result = await schedules()
    expect(result.length).toEqual(Object.keys(scenario.schedule).length)
  })

  scenario('returns a single schedule', async (scenario: StandardScenario) => {
    const result = await schedule({ id: scenario.schedule.one.id })
    expect(result).toEqual(scenario.schedule.one)
  })

  scenario('creates a schedule', async (scenario: StandardScenario) => {
    const result = await createSchedule({
      input: {
        accountId: scenario.schedule.two.accountId,
        agentId: scenario.schedule.two.agentId,
        startTime: '2024-04-30T15:41:39.928Z', // startTime to be after the previous schedules
        endTime: '2024-04-30T16:41:39.928Z', // endTime to be after startTime
      },
    })
    expect(result.accountId).toEqual(scenario.schedule.two.accountId)
    expect(result.agentId).toEqual(scenario.schedule.two.agentId)
    expect(result.startTime).toEqual(new Date('2024-04-30T15:41:39.928Z'))
    expect(result.endTime).toEqual(new Date('2024-04-30T16:41:39.928Z'))
  })

  scenario('updates a schedule', async (scenario: StandardScenario) => {
    const original = await schedule({
      id: scenario.schedule.one.id,
    })
    const result = await updateSchedule({
      id: original.id,
      input: {
        startTime: '2024-05-30T11:45:00.000Z', // startTime to be within the original schedule's timeframe
        endTime: '2024-05-30T12:00:00.000Z', // endTime to be after startTime and within the original schedule's timeframe
      },
    })
    expect(result.startTime).toEqual(new Date('2024-05-30T11:45:00.000Z'))
    expect(result.endTime).toEqual(new Date('2024-05-30T12:00:00.000Z'))
  })

  scenario('deletes a schedule', async (scenario: StandardScenario) => {
    const original = await deleteSchedule({
      id: scenario.schedule.one.id,
    })
    const result = await schedule({ id: original.id })
    expect(result).toEqual(null)
  })

  scenario(
    'fails to create a schedule when start time is in the past',
    async (scenario: StandardScenario) => {
      const currentTime = new Date()
      const pastStartTime = new Date(
        currentTime.getTime() - 24 * 60 * 60 * 1000
      ) // 1 day in the past

      try {
        await createSchedule({
          input: {
            accountId: scenario.schedule.two.accountId,
            agentId: scenario.schedule.two.agentId,
            startTime: pastStartTime.toISOString(),
            endTime: currentTime.toISOString(),
          },
        })
        throw new Error('Expected a validation error') // If the creation succeeds, fail the test
      } catch (error) {
        expect(error.message).toContain('The start time cannot be in the past.')
      }
    }
  )

  scenario(
    'fails to create a schedule when end date is less than start date',
    async (scenario: StandardScenario) => {
      try {
        await createSchedule({
          input: {
            accountId: scenario.schedule.two.accountId,
            agentId: scenario.schedule.two.agentId,
            startTime: '2024-04-30T15:41:39.928Z',
            endTime: '2024-04-30T14:41:39.928Z', // endTime is less than startTime
          },
        })
        fail('Expected a validation error') // If the creation succeeds, fail the test
      } catch (error) {
        expect(error.message).toContain(
          'The start time must be before the end time.'
        )
      }
    }
  )

  scenario(
    'fails to create a schedule when end date is equal to start date',
    async (scenario: StandardScenario) => {
      try {
        await createSchedule({
          input: {
            accountId: scenario.schedule.two.accountId,
            agentId: scenario.schedule.two.agentId,
            startTime: '2024-04-30T15:41:39.928Z',
            endTime: '2024-04-30T15:41:39.928Z', // endTime is equal to startTime
          },
        })
        fail('Expected a validation error') // If the creation succeeds, fail the test
      } catch (error) {
        expect(error.message).toContain(
          'The start time must be before the end time.'
        )
      }
    }
  )

  scenario(
    'fails to create a schedule when duration exceeds the maximum allowed',
    async (scenario: StandardScenario) => {
      try {
        await createSchedule({
          input: {
            accountId: scenario.schedule.two.accountId,
            agentId: scenario.schedule.two.agentId,
            startTime: '2025-04-30T09:00:00.000Z',
            endTime: '2025-05-30T21:00:00.000Z', // Schedule duration is 12 hours (exceeds the maximum of 40 hours)
          },
        })
        fail('Expected a validation error') // If the creation succeeds, fail the test
      } catch (error) {
        expect(error.message).toContain(
          'The schedule duration cannot exceed 40 hours.'
        )
      }
    }
  )
})
