import type { Competence } from '@prisma/client'

import {
  competences,
  competence,
  createCompetence,
  updateCompetence,
  deleteCompetence,
} from './competences'
import type { StandardScenario } from './competences.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('competences', () => {
  scenario('returns all competences', async (scenario: StandardScenario) => {
    const result = await competences()

    expect(result.length).toEqual(Object.keys(scenario.competence).length)
  })

  scenario(
    'returns a single competence',
    async (scenario: StandardScenario) => {
      const result = await competence({ id: scenario.competence.one.id })

      expect(result).toEqual(scenario.competence.one)
    }
  )

  scenario('creates a competence', async () => {
    const result = await createCompetence({
      input: { name: 'String', type: 'DISCIPLINARY' },
    })

    expect(result.name).toEqual('String')
    expect(result.type).toEqual('DISCIPLINARY')
  })

  scenario('updates a competence', async (scenario: StandardScenario) => {
    const original = (await competence({
      id: scenario.competence.one.id,
    })) as Competence
    const result = await updateCompetence({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a competence', async (scenario: StandardScenario) => {
    const original = (await deleteCompetence({
      id: scenario.competence.one.id,
    })) as Competence
    const result = await competence({ id: original.id })

    expect(result).toEqual(null)
  })
})
