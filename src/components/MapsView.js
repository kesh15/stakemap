'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.icon({
    iconUrl: '/icons/MarkerStakeholder.png',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
})

export default function MapView() {
    return (
        <div className="h-96 w-fill mx-4">
            <MapContainer center={[-6.012109, 106.048710]} zoom={14} className="h-full w-full">
                <TileLayer
                    attribution='© OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-6.012109, 106.048710]} icon={customIcon}>
                    <Popup>Rumah Sakit Cilegon</Popup>
                </Marker>
                <Marker position={[-6.013646, 106.050009]} icon={customIcon}>
                    <Popup>SD Cilegon</Popup>
                </Marker>
                <Marker position={[-6.011651, 106.055845]} icon={customIcon}>
                    <Popup>Madrasah Cilegon</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}