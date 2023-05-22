import type { ComponentMeta } from '@storybook/react'

import InitiativePage from './InitiativePage'

export const generated = () => {
  return <InitiativePage />
}

export default {
  title: 'Pages/InitiativePage',
  component: InitiativePage,
} as ComponentMeta<typeof InitiativePage>
