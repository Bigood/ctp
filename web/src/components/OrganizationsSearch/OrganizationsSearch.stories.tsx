// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof OrganizationsSearch> = (args) => {
//   return <OrganizationsSearch {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import OrganizationsSearch from './OrganizationsSearch'

export const generated = () => {
  return <OrganizationsSearch />
}

export default {
  title: 'Components/OrganizationsSearch',
  component: OrganizationsSearch,
} as ComponentMeta<typeof OrganizationsSearch>
