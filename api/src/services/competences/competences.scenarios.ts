import type { Prisma, Competence } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CompetenceCreateArgs>({
  competence: {
    one: { data: { name: 'String', type: 'DISCIPLINARY' } },
    two: { data: { name: 'String', type: 'DISCIPLINARY' } },
  },
})

export type StandardScenario = ScenarioData<Competence, 'competence'>
