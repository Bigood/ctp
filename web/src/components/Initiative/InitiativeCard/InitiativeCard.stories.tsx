// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof InitiativeCard> = (args) => {
//   return <InitiativeCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import InitiativeCard from './InitiativeCard'

export const generated = () => {
  return <InitiativeCard />
}

export default {
  title: 'Components/InitiativeCard',
  component: InitiativeCard,
} as ComponentMeta<typeof InitiativeCard>
