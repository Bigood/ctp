import type { ComponentMeta } from '@storybook/react'

import EditProfilePage from './EditProfilePage'

export const generated = () => {
  return <EditProfilePage />
}

export default {
  title: 'Pages/EditProfilePage',
  component: EditProfilePage,
} as ComponentMeta<typeof EditProfilePage>
