import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        updatedAt: '2022-12-13T15:26:41.607Z',
        email: 'String539582',
        organization: {
          create: { updatedAt: '2022-12-13T15:26:41.607Z', name: 'String' },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-12-13T15:26:41.607Z',
        email: 'String6507022',
        organization: {
          create: { updatedAt: '2022-12-13T15:26:41.607Z', name: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
