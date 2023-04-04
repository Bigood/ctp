// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof OrganizationModal> = (args) => {
//   return <OrganizationModal {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import OrganizationModal from './OrganizationModal'

export const generated = () => {
  return <OrganizationModal />
}

export default {
  title: 'Components/OrganizationModal',
  component: OrganizationModal,
} as ComponentMeta<typeof OrganizationModal>
