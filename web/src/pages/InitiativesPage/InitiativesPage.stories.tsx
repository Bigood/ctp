import type { ComponentMeta } from '@storybook/react'

import InitiativesPage from './InitiativesPage'

export const generated = () => {
  return <InitiativesPage />
}

export default {
  title: 'Pages/InitiativesPage',
  component: InitiativesPage,
} as ComponentMeta<typeof InitiativesPage>
