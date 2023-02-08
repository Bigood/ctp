// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Profile> = (args) => {
//   return <Profile {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Profile from './Profile'

export const generated = () => {
  return <Profile />
}

export default {
  title: 'Components/Profile',
  component: Profile,
} as ComponentMeta<typeof Profile>
