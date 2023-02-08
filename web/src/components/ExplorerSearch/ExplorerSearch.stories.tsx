// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ExplorerSearch> = (args) => {
//   return <ExplorerSearch {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ExplorerSearch from './ExplorerSearch'

export const generated = () => {
  return <ExplorerSearch />
}

export default {
  title: 'Components/ExplorerSearch',
  component: ExplorerSearch,
} as ComponentMeta<typeof ExplorerSearch>
