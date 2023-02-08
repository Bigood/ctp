import type { ComponentMeta } from '@storybook/react'

import ExplorerPage from './ExplorerPage'

export const generated = () => {
  return <ExplorerPage />
}

export default {
  title: 'Pages/ExplorerPage',
  component: ExplorerPage,
} as ComponentMeta<typeof ExplorerPage>
