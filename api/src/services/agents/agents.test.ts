import { agents, agent } from './agents'
import type { StandardScenario } from './agents.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('agents', () => {
  scenario('returns all agents', async (scenario: StandardScenario) => {
    const result = await agents()

    expect(result.length).toEqual(Object.keys(scenario.agent).length)
  })

  scenario('returns a single agent', async (scenario: StandardScenario) => {
    const result = await agent({ id: scenario.agent.one.id })

    expect(result).toEqual(scenario.agent.one)
  })
})
