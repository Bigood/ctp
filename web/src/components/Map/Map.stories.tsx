// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Map> = (args) => {
//   return <Map {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory} from '@storybook/react'

import Map, { UsersMap } from './Map'

const sampleMarkers = [
  {
    id: 1,
    longitude: -1,
    latitude: 46.2,
    name: "Maen J",
    email: "mj@g.c",
    // instanceId: "mac-a.cartotalents.com"
  },
  {
    id: 2,
    longitude: -1.3,
    latitude: 46.4,
    name: "JDB",
    email: "jdb@g.c",
    instanceId: "mac-b.cartotalents.com"
}
]
export const withUsers = () => {
  return <UsersMap markers={sampleMarkers} />
}
export const generated: ComponentStory<typeof Map> = (args) => {
  return <Map markers={sampleMarkers} {...args}/>
}

export default {
  title: 'Components/Map',
  component: Map,
} as ComponentMeta<typeof Map>
