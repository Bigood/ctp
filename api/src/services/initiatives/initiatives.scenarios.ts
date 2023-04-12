import type { Prisma, Initiative } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InitiativeCreateArgs>({
  initiative: {
    one: {
      data: {
        updatedAt: '2023-04-11T15:19:14.837Z',
        author: {
          create: {
            updatedAt: '2023-04-11T15:19:14.837Z',
            email: 'String9576139',
            organization: {
              create: {
                updatedAt: '2023-04-11T15:19:14.837Z',
                name: 'String3186480',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-04-11T15:19:14.837Z',
        author: {
          create: {
            updatedAt: '2023-04-11T15:19:14.837Z',
            email: 'String9382691',
            organization: {
              create: {
                updatedAt: '2023-04-11T15:19:14.837Z',
                name: 'String2022055',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Initiative, 'initiative'>
