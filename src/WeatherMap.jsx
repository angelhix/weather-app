import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function WeatherMap({ lat, lon, city }) {
  return (
    <MapContainer center={[lat, lon]} zoom={8} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default WeatherMap