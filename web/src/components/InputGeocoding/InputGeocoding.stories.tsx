// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof InputGeocoding> = (args) => {
//   return <InputGeocoding {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import Map from '../Map/Map'

import InputGeocoding from './InputGeocoding'

export const generated: ComponentStory<typeof InputGeocoding> = () => {
  return <InputGeocoding />
}

export const withController: ComponentStory<typeof InputGeocoding> = () => {
  const [address, setAddress] = useState("La bastille")
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState()

  const onSelect = (item) => {
    const [_longitude, _latitude] =
      typeof item.center === 'string'
        ? item.center.split(',')
        : item.center

    setLongitude(_longitude)
    setLatitude(_latitude)
    setAddress(item.place_name_fr)
  }
  return (
  <>
    <InputGeocoding onSelect={onSelect} value={address}/>
    <div>Longitude : {longitude}</div>
    <div>Latitude : {latitude}</div>
  </>)
}
export const withMap: ComponentStory<typeof InputGeocoding> = () => {
  const [address, setAddress] = useState('La bastille')
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState()
  const [markers, setMarkers] = useState([])

  const onSelect = (item) => {
    const [_longitude, _latitude] =
      typeof item.center === 'string'
        ? item.center.split(',')
        : item.center

    setLongitude(_longitude)
    setLatitude(_latitude)
    setAddress(item.place_name_fr)
    setMarkers([
      {
        longitude: _longitude,
        latitude: _latitude
      }
    ])
  }
  return (
    <>
      <InputGeocoding onSelect={onSelect} value={address} />
      <Map markers={markers}/>
      <div>Longitude : {longitude}</div>
      <div>Latitude : {latitude}</div>
    </>
  )
}

export default {
  title: 'Components/InputGeocoding',
  component: InputGeocoding,
} as ComponentMeta<typeof InputGeocoding>
