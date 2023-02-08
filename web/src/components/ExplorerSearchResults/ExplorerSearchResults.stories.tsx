// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ExplorerSearchResults> = (args) => {
//   return <ExplorerSearchResults {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ExplorerSearchResults from './ExplorerSearchResults'

export const generated = () => {
  return <ExplorerSearchResults />
}

export default {
  title: 'Components/ExplorerSearchResults',
  component: ExplorerSearchResults,
} as ComponentMeta<typeof ExplorerSearchResults>
