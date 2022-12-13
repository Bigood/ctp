import type { Prisma, Practice } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PracticeCreateArgs>({
  practice: {
    one: {
      data: {
        updatedAt: '2022-12-13T15:01:50.124Z',
        name: 'String',
        synonym: 'String',
        sources: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-12-13T15:01:50.124Z',
        name: 'String',
        synonym: 'String',
        sources: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Practice, 'practice'>
