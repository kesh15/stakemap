"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "/icons/MarkerStakeholder.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

interface MapViewProps {
  className?: string;
}

export default function MapView({ className }: MapViewProps) {
  return (
    <div className={`h-80 w-298 mx-4 border-2 border-gray-400 rounded-lg overflow-hidden ${className}`}>
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
          <Popup>Cahaya Literasi</Popup>
        </Marker>
        <Marker position={[-6.013646, 106.050009]} icon={customIcon}>
          <Popup>Taman Kencana</Popup>
        </Marker>
        <Marker position={[-6.011651, 106.055845]} icon={customIcon}>
          <Popup>Lentera Cahaya</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
