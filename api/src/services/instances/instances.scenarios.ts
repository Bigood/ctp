import type { Prisma, Instance } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InstanceCreateArgs>({
  instance: {
    one: {
      data: { host: 'String4294296', updatedAt: '2022-12-21T16:50:18.833Z' },
    },
    two: {
      data: { host: 'String4700622', updatedAt: '2022-12-21T16:50:18.833Z' },
    },
  },
})

export type StandardScenario = ScenarioData<Instance, 'instance'>
