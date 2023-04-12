import type { Network } from '@prisma/client'

import {
  networks,
  network,
  createNetwork,
  updateNetwork,
  deleteNetwork,
} from './networks'
import type { StandardScenario } from './networks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('networks', () => {
  scenario('returns all networks', async (scenario: StandardScenario) => {
    const result = await networks()

    expect(result.length).toEqual(Object.keys(scenario.network).length)
  })

  scenario('returns a single network', async (scenario: StandardScenario) => {
    const result = await network({ id: scenario.network.one.id })

    expect(result).toEqual(scenario.network.one)
  })

  scenario('creates a network', async () => {
    const result = await createNetwork({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a network', async (scenario: StandardScenario) => {
    const original = (await network({ id: scenario.network.one.id })) as Network
    const result = await updateNetwork({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a network', async (scenario: StandardScenario) => {
    const original = (await deleteNetwork({
      id: scenario.network.one.id,
    })) as Network
    const result = await network({ id: original.id })

    expect(result).toEqual(null)
  })
})
