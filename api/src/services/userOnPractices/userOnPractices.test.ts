import type { UserOnPractice } from '@prisma/client'

import {
  userOnPractices,
  userOnPractice,
  createUserOnPractice,
  updateUserOnPractice,
  deleteUserOnPractice,
} from './userOnPractices'
import type { StandardScenario } from './userOnPractices.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userOnPractices', () => {
  scenario(
    'returns all userOnPractices',
    async (scenario: StandardScenario) => {
      const result = await userOnPractices()

      expect(result.length).toEqual(Object.keys(scenario.userOnPractice).length)
    }
  )

  scenario(
    'returns a single userOnPractice',
    async (scenario: StandardScenario) => {
      const result = await userOnPractice({
        id: scenario.userOnPractice.one.id,
      })

      expect(result).toEqual(scenario.userOnPractice.one)
    }
  )

  scenario('creates a userOnPractice', async (scenario: StandardScenario) => {
    const result = await createUserOnPractice({
      input: {
        userId: scenario.userOnPractice.two.userId,
        practiceId: scenario.userOnPractice.two.practiceId,
      },
    })

    expect(result.userId).toEqual(scenario.userOnPractice.two.userId)
    expect(result.practiceId).toEqual(scenario.userOnPractice.two.practiceId)
  })

  scenario('updates a userOnPractice', async (scenario: StandardScenario) => {
    const original = (await userOnPractice({
      id: scenario.userOnPractice.one.id,
    })) as UserOnPractice
    const result = await updateUserOnPractice({
      id: original.id,
      input: { userId: scenario.userOnPractice.two.userId },
    })

    expect(result.userId).toEqual(scenario.userOnPractice.two.userId)
  })

  scenario('deletes a userOnPractice', async (scenario: StandardScenario) => {
    const original = (await deleteUserOnPractice({
      id: scenario.userOnPractice.one.id,
    })) as UserOnPractice
    const result = await userOnPractice({ id: original.id })

    expect(result).toEqual(null)
  })
})
