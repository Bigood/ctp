// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LanguageSwap> = (args) => {
//   return <LanguageSwap {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LanguageSwap from './LanguageSwap'

export const generated = () => {
  return <LanguageSwap />
}

export default {
  title: 'Components/LanguageSwap',
  component: LanguageSwap,
} as ComponentMeta<typeof LanguageSwap>
