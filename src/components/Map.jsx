import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState } from "react";
import {useCities} from "./contexts/CitiesContext"
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([50, 50])
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng")

const {cities} = useCities()
  const navigate = useNavigate()
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
   <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    { cities.map(city =>(
      <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji} {city.cityName}</span>
      </Popup>
    </Marker>))}
    <ChangeCenter position={[mapLat||40, mapLng||40]}/>
  </MapContainer>
  
  </div>
  );
}
function ChangeCenter({position}){
  const map = useMap();
  map.setView(position)
  return null;

}
export default Map;
