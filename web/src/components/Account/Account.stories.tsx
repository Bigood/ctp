// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Account> = (args) => {
//   return <Account {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Account from './Account'

export const generated = () => {
  return <Account />
}

export default {
  title: 'Components/Account',
  component: Account,
} as ComponentMeta<typeof Account>
