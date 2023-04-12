import type { Level } from '@prisma/client'

import { levels, level, createLevel, updateLevel, deleteLevel } from './levels'
import type { StandardScenario } from './levels.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('levels', () => {
  scenario('returns all levels', async (scenario: StandardScenario) => {
    const result = await levels()

    expect(result.length).toEqual(Object.keys(scenario.level).length)
  })

  scenario('returns a single level', async (scenario: StandardScenario) => {
    const result = await level({ id: scenario.level.one.id })

    expect(result).toEqual(scenario.level.one)
  })

  scenario('creates a level', async () => {
    const result = await createLevel({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a level', async (scenario: StandardScenario) => {
    const original = (await level({ id: scenario.level.one.id })) as Level
    const result = await updateLevel({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a level', async (scenario: StandardScenario) => {
    const original = (await deleteLevel({ id: scenario.level.one.id })) as Level
    const result = await level({ id: original.id })

    expect(result).toEqual(null)
  })
})
