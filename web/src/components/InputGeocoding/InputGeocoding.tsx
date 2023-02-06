import { ControllerRenderProps } from '@redwoodjs/forms'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Autocomplete from './Autocomplete'

// InputGeocoding.propTypes = {
//   onSelect: PropTypes.func.isRequired,
//   initialValue: PropTypes.string,
// }

interface InputProps extends ControllerRenderProps {
  onSelect(any): void
}

const InputGeocoding = (props:InputProps) => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDatasource] = useState([])


  const searchResult = async (query) => {
    // props.onChange(query);
    setLoading(true)

    let response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&autocomplete=true&country=fr&proximity=47.212999%2C-1.552882&limit=10&language=fr`
    ).catch(console.error)
    //Conversion en JSON
    let data = await response.json()
    console.log(data)
    setLoading(false)
    setDatasource(data.features.length ? data.features : [])
  }

  return (
    <div className="global-search-wrapper">
      <Autocomplete
        className="global-search"
        style={{ width: '100%' }}
        dataSource={dataSource}
        value={props.value}
        resultKey="place_name_fr"
        onSelect={props.onSelect}
        loading={loading}
        placeholder="Rechercher une adresse…"
        onSearch={searchResult}
        {...props}
      ></Autocomplete>
    </div>
  )
}

export default InputGeocoding;