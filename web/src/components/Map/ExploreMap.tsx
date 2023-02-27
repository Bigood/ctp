import _ from "lodash"
import { useContext, useEffect, useRef, useState } from "react"
import { GeoJSONSource, Layer, LayerProps, Map, MapRef, Source } from "react-map-gl"
import QueryContext from "src/providers/context/QueryContext"
import '../../../../node_modules/mapbox-gl/dist/mapbox-gl.css'

const DEFAULT_GEOJSON = {
      "type": "FeatureCollection",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": []

}
const dataToGeoJson = (data: any[]) => {
  let geojson = _.clone(DEFAULT_GEOJSON)
  geojson.features = data.map((item) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [item.organization.longitude, item.organization.latitude],
    },
    properties: item,
  }))
  return geojson
}

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'items',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [ 'step', ['get', 'point_count'], 'rgb(217,38,170)', 10, 'rgb(102,26,230)', 50, 'rgb(31,178,165)', ],
    'circle-radius': ['step', ['get', 'point_count'], 15, 10, 25, 50, 35],
  },
}

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'items',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
}

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'items',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': 'rgb(217,38,170)',
    'circle-radius': 5,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff',
  },
}

const defaultMapCenter = {
  longitude: -1.569431,
  latitude: 47.204438,
  zoom: 4,
}
export default function ExploreMap(props) {
  const { ...rest} = props;
  const { results, setFocused } = useContext(QueryContext)

  const [geojson, setGeojson] = useState(DEFAULT_GEOJSON)

  useEffect(() => {
    setGeojson(dataToGeoJson(results));
  }, [results])

  const mapRef = useRef<MapRef>(null)

  const onClick = (event) => {
    const feature = event.features[0]

    //Clic dans le vide ?
    if(!feature)
      return;

    const clusterId = feature.properties.cluster_id

    //Si on clique sur un marqueur, et pas sur un cluster, on l'affiche direct
    if(!clusterId)
      return setFocused([feature]);

    const mapboxSource = mapRef.current.getSource('items') as GeoJSONSource

    //https://docs.mapbox.com/mapbox-gl-js/api/sources/#geojsonsource#getclusterchildren
    mapboxSource.getClusterChildren(clusterId, (error, features) => {
      if (!error) {
        console.log('Cluster children:', features)
      }
      //Si y'a un sous cluster
      if(features.find(feature => feature.properties.cluster == true)) {
        //Zoom
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return
          }

          mapRef.current.easeTo({
            center: feature.geometry.coordinates,
            zoom,
            duration: 500,
          })
        })
      }
      //Sinon, on affiche dans le panneau latéral
      else
        setFocused(features)
    })


  }

  return (
    <>
      <Map
        initialViewState={defaultMapCenter}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        onClick={onClick}
        ref={mapRef}
        {...rest}
      >
        {props.children}
        <Source
          id="items"
          type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={20}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  )
}