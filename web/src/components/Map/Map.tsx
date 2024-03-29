import ReactDOMServer from 'react-dom/server';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from "mapbox-gl";

//Using next.js scoped css for injection on newly created marker, which isn't scoped by default
//https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css
// import moduleStyles from './Map.module.css'
import '../../../../node_modules/mapbox-gl/dist/mapbox-gl.css'

import { Link } from '@redwoodjs/router';
import { routes } from '@redwoodjs/router';
import { LOCALSTORAGE_KEY } from "../ThemeSwap/ThemeSwap";

export const MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }

export const MAPBOX_STYLES = {
  "dark": 'mapbox://styles/mapbox/dark-v11',
  "light": 'mapbox://styles/mapbox/light-v11',
}
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

interface MarkerProps {
  longitude: number
  latitude: number
}
interface MapProps {
  /**
   * Array of markers to display at map render.
   */
  markers?: [MarkerProps]
  markerGenerator?(any): any
  popupGenerator?(any): any

  centerOnMarkers?: boolean
  zoomLevel?: number
  /**
   * Optional style override
   */
  style?: {}
  className?: string
}

const defaultMapCenter = {
  lng: -1.569431,
  lat: 47.204438,
  zoom: 4
}
const defaultMarker = (marker: MarkerProps) => {
  return (
    <img
      src={`//www.gravatar.com/avatar/`}
      className="h-5 w-5 rounded-full"
    />
  )
}
const defaultPopup = (marker: MarkerProps) => {
  return (
    <div className="bg-white p-2">
      <pre>{JSON.stringify(marker, null, 2)}</pre>
    </div>
  )
}
const Map = (props: MapProps) => {
  const {
    markers,
    style = {},
    className = 'relative h-64',
    popupGenerator = defaultPopup,
    markerGenerator = defaultMarker,
    zoomLevel = defaultMapCenter.zoom,
    centerOnMarkers = false
  } = props
  const mapContainerHTML = useRef(null);
  const map = useRef(null);
  const [displayedMarkers, setDisplayedMarkers] = useState([]);

  useEffect(() => {
    if (map.current) return // wait for map to initialize
    map.current = new mapboxgl.Map({
      container: mapContainerHTML.current,
      style: MAPBOX_STYLES[localStorage.getItem(LOCALSTORAGE_KEY) || 1],
      center: [defaultMapCenter.lng, defaultMapCenter.lat],
      zoom: zoomLevel,
    })
  }, [])

  useEffect(() => {
    if (map.current && markers?.length){
      //Suprression manuelle des markers précédents, s'il y en a https://stackoverflow.com/a/55917076/1437016
      displayedMarkers.forEach((marker) => marker?.remove())
      setDisplayedMarkers(
        markers.map((marker) => {
          //@ts-ignore Multiple types de markers. On pioche dans organization si c'est un utilisateur,
          //sinon faudrait itérer à travers tous les utilisateurs en amont pour aplatir la localisation
          const { longitude, latitude } = marker?.organization || marker
          if (!longitude || !latitude) return

          var el = document.createElement('div')
          // el.className = moduleStyles.marker;
          el.innerHTML = ReactDOMServer.renderToStaticMarkup(
            markerGenerator(marker)
          )
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            ReactDOMServer.renderToStaticMarkup(popupGenerator(marker))
          )

          return new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map.current)
        })
      )

      //Focus on marker if provided in props
      if(centerOnMarkers && markers?.length){
        //Get all markers to fit in screen
        if (markers.length > 1)
          map.current.fitBounds(map.current.getBounds())
        //Only one marker, no bounds
        else{
          const firstMarker = markers[0]
          if(firstMarker.longitude && firstMarker.latitude)
            map.current.setCenter({lng: firstMarker.longitude, lat: firstMarker.latitude})
        }
      }
    }
  }, [markers])
  return (
    <div >
      <div
        ref={(el) => (mapContainerHTML.current = el)}
        className={className}
        style={style}
      />
    </div>
  )
}

export default Map

interface UserMarkerProps {
  id: any
  image?: string
  name?: string
  surname?: string
  organization: { name: string, longitude: number; latitude: number }

  /**
   * Possible instance id, where the data comes from
   */
  instanceId?: string
}
const getInitials = (name: string) => {
  return name.replace(/[^A-Z]/g, '')
}
const generateUserMarker = (marker: UserMarkerProps) => {
  return (
    <img
      className={marker.instanceId ? 'remote-border' : 'local-border'}
      src={`//www.gravatar.com/avatar/${MD5(marker.id)}?d=robohash&s=30`}
    />
  )
}
const generateUserPopup = (user: UserMarkerProps) => {
  return (
    <div className="bg-white p-2">
      <h2 className="text-lg">{user.name} {user.surname}</h2>
      <p>{user.organization?.name}</p>
      {typeof user.instanceId == 'string' ? (
        <div>
          <p>Remote user from {user.instanceId}</p>
          <a
            className="btn btn-sm btn-secondary"
            href={`//${user.instanceId}/user/${user.id}`}
          >
            See on remote site
          </a>
        </div>
      ) : (
        <div>

          <Link to={routes.showUser({ id: user.id })} title={'Show user ' + user.id + ' detail'}>
            <div
              className="btn btn-sm btn-primary"
            >
              See more
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}
export const UsersMap = (props) => {
  return (
    <Map
      markerGenerator={generateUserMarker}
      popupGenerator={generateUserPopup}
      {...props}
    />
  )
}