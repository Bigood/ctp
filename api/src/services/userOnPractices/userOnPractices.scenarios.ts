import type { Prisma, UserOnPractice } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserOnPracticeCreateArgs>({
  userOnPractice: {
    one: {
      data: {
        user: {
          create: {
            updatedAt: '2022-12-13T14:39:46.968Z',
            email: 'String522253',
            organization: {
              create: { updatedAt: '2022-12-13T14:39:46.968Z', name: 'String' },
            },
          },
        },
        practice: {
          create: { updatedAt: '2022-12-13T14:39:46.968Z', name: 'String' },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            updatedAt: '2022-12-13T14:39:46.968Z',
            email: 'String2272882',
            organization: {
              create: { updatedAt: '2022-12-13T14:39:46.968Z', name: 'String' },
            },
          },
        },
        practice: {
          create: { updatedAt: '2022-12-13T14:39:46.968Z', name: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserOnPractice, 'userOnPractice'>
