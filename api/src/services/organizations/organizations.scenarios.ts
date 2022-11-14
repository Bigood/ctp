import type { Prisma, Organization } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationCreateArgs>({
  organization: {
    one: { data: { updatedAt: '2022-11-14T14:37:47.390Z', name: 'String' } },
    two: { data: { updatedAt: '2022-11-14T14:37:47.390Z', name: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Organization, 'organization'>
