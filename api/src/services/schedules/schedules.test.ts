import type { Schedule } from '@prisma/client'

import {
  schedules,
  schedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from './schedules'
import type { StandardScenario } from './schedules.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('schedules', () => {
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
        startTime: '2024-04-30T11:29:43.760Z',
        endTime: '2024-04-30T11:29:43.760Z',
      },
    })

    expect(result.accountId).toEqual(scenario.schedule.two.accountId)
    expect(result.agentId).toEqual(scenario.schedule.two.agentId)
    expect(result.startTime).toEqual(new Date('2024-04-30T11:29:43.760Z'))
    expect(result.endTime).toEqual(new Date('2024-04-30T11:29:43.760Z'))
  })

  scenario('updates a schedule', async (scenario: StandardScenario) => {
    const original = (await schedule({
      id: scenario.schedule.one.id,
    })) as Schedule
    const result = await updateSchedule({
      id: original.id,
      input: { startTime: '2024-05-01T11:29:43.760Z' },
    })

    expect(result.startTime).toEqual(new Date('2024-05-01T11:29:43.760Z'))
  })

  scenario('deletes a schedule', async (scenario: StandardScenario) => {
    const original = (await deleteSchedule({
      id: scenario.schedule.one.id,
    })) as Schedule
    const result = await schedule({ id: original.id })

    expect(result).toEqual(null)
  })
})
