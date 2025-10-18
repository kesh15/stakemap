"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.icon({
  iconUrl: "/icons/MarkerStakeholder.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

export default function MapViewStakeholder() {
  return (
    <div className="h-80 w-298 mx-4 border-2 border-gray-400 rounded-lg overflow-hidden">
      <MapContainer
        center={[-6.012109, 106.04871]}
        zoom={14}
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-6.012109, 106.04871]} icon={customIcon}>
          <Popup>Dinas PUPR</Popup>
        </Marker>
        <Marker position={[-6.013646, 106.050009]} icon={customIcon}>
          <Popup>Lurah</Popup>
        </Marker>
        <Marker position={[-6.011651, 106.055845]} icon={customIcon}>
          <Popup>Sekda</Popup>
        </Marker>
        <Marker position={[-6.011631, 106.055860]} icon={customIcon}>
          <Popup>Walikota</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
