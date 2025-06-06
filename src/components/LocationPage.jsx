import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/location.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const LocationPage = () => {
  const navigate = useNavigate();
  const position = [-2.6, 115.0]; // Lokasi di Kalimantan Selatan

  return (
    <div className="location-container">
      <h2 data-aos="fade-right" data-aos-delay="100" data-aos-easing="ease-in-out">Lokasi Perangkat</h2>
      <hr data-aos="fade-right" data-aos-delay="200" data-aos-easing="ease-in-out"/>
      <div className="map-info" data-aos="zoom-in" data-aos-delay="300"  data-aos-easing="ease-out-cubic">
        <MapContainer center={position} zoom={5} scrollWheelZoom={false} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Desa Pawalutan, Kec. Banjang, Kab. Hulu Sungai Utara (HSU), Kalimantan Selatan, 71663</Popup>
          </Marker>
        </MapContainer>
        <div className="location-text">
          Desa Pawalutan, Kec. Banjang,<br />
          Kab. Hulu Sungai Utara (HSU),<br />
          Kalimantan Selatan, 71663
        </div>
      </div>
      <div data-aos="fade-left" data-aos-delay="400" data-aos-easing="ease-in-out">
        <button className="close-button" onClick={() => navigate('/')}>Close</button>
      </div>
    </div>
  );
};

export default LocationPage;
