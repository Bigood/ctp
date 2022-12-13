import type { Practice } from '@prisma/client'

import {
  practices,
  practice,
  createPractice,
  updatePractice,
  deletePractice,
} from './practices'
import type { StandardScenario } from './practices.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('practices', () => {
  scenario('returns all practices', async (scenario: StandardScenario) => {
    const result = await practices()

    expect(result.length).toEqual(Object.keys(scenario.practice).length)
  })

  scenario('returns a single practice', async (scenario: StandardScenario) => {
    const result = await practice({ id: scenario.practice.one.id })

    expect(result).toEqual(scenario.practice.one)
  })

  scenario('creates a practice', async () => {
    const result = await createPractice({
      input: {
        updatedAt: '2022-12-13T15:01:50.094Z',
        name: 'String',
        synonym: 'String',
        sources: 'String',
      },
    })

    expect(result.updatedAt).toEqual(new Date('2022-12-13T15:01:50.094Z'))
    expect(result.name).toEqual('String')
    expect(result.synonym).toEqual('String')
    expect(result.sources).toEqual('String')
  })

  scenario('updates a practice', async (scenario: StandardScenario) => {
    const original = (await practice({
      id: scenario.practice.one.id,
    })) as Practice
    const result = await updatePractice({
      id: original.id,
      input: { updatedAt: '2022-12-14T15:01:50.094Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2022-12-14T15:01:50.094Z'))
  })

  scenario('deletes a practice', async (scenario: StandardScenario) => {
    const original = (await deletePractice({
      id: scenario.practice.one.id,
    })) as Practice
    const result = await practice({ id: original.id })

    expect(result).toEqual(null)
  })
})
