// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ThemeSwap> = (args) => {
//   return <ThemeSwap {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ThemeSwap from './ThemeSwap'

export const generated = () => {
  return <ThemeSwap />
}

export default {
  title: 'Components/ThemeSwap',
  component: ThemeSwap,
} as ComponentMeta<typeof ThemeSwap>
