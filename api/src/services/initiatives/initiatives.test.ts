import type { Initiative } from '@prisma/client'

import {
  initiatives,
  initiative,
  createInitiative,
  updateInitiative,
  deleteInitiative,
} from './initiatives'
import type { StandardScenario } from './initiatives.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('initiatives', () => {
  scenario('returns all initiatives', async (scenario: StandardScenario) => {
    const result = await initiatives()

    expect(result.length).toEqual(Object.keys(scenario.initiative).length)
  })

  scenario(
    'returns a single initiative',
    async (scenario: StandardScenario) => {
      const result = await initiative({ id: scenario.initiative.one.id })

      expect(result).toEqual(scenario.initiative.one)
    }
  )

  scenario('creates a initiative', async (scenario: StandardScenario) => {
    const result = await createInitiative({
      input: {
        updatedAt: '2023-04-11T15:19:14.809Z',
        authorId: scenario.initiative.two.authorId,
      },
    })

    expect(result.updatedAt).toEqual(new Date('2023-04-11T15:19:14.809Z'))
    expect(result.authorId).toEqual(scenario.initiative.two.authorId)
  })

  scenario('updates a initiative', async (scenario: StandardScenario) => {
    const original = (await initiative({
      id: scenario.initiative.one.id,
    })) as Initiative
    const result = await updateInitiative({
      id: original.id,
      input: { updatedAt: '2023-04-12T15:19:14.809Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-04-12T15:19:14.809Z'))
  })

  scenario('deletes a initiative', async (scenario: StandardScenario) => {
    const original = (await deleteInitiative({
      id: scenario.initiative.one.id,
    })) as Initiative
    const result = await initiative({ id: original.id })

    expect(result).toEqual(null)
  })
})
