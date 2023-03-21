import type { ComponentMeta } from '@storybook/react'

import LoggedInProfilePage from './LoggedInProfilePage'

export const generated = () => {
  return <LoggedInProfilePage />
}

export default {
  title: 'Pages/LoggedInProfilePage',
  component: LoggedInProfilePage,
} as ComponentMeta<typeof LoggedInProfilePage>
