import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        updatedAt: '2022-11-14T14:38:36.897Z',
        email: 'String4464106',
        organization: {
          create: { updatedAt: '2022-11-14T14:38:36.897Z', name: 'String' },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-11-14T14:38:36.897Z',
        email: 'String3480280',
        organization: {
          create: { updatedAt: '2022-11-14T14:38:36.897Z', name: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
