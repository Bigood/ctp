import type { Sponsor } from '@prisma/client'

import {
  sponsors,
  sponsor,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from './sponsors'
import type { StandardScenario } from './sponsors.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sponsors', () => {
  scenario('returns all sponsors', async (scenario: StandardScenario) => {
    const result = await sponsors()

    expect(result.length).toEqual(Object.keys(scenario.sponsor).length)
  })

  scenario('returns a single sponsor', async (scenario: StandardScenario) => {
    const result = await sponsor({ id: scenario.sponsor.one.id })

    expect(result).toEqual(scenario.sponsor.one)
  })

  scenario('creates a sponsor', async () => {
    const result = await createSponsor({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a sponsor', async (scenario: StandardScenario) => {
    const original = (await sponsor({ id: scenario.sponsor.one.id })) as Sponsor
    const result = await updateSponsor({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a sponsor', async (scenario: StandardScenario) => {
    const original = (await deleteSponsor({
      id: scenario.sponsor.one.id,
    })) as Sponsor
    const result = await sponsor({ id: original.id })

    expect(result).toEqual(null)
  })
})
