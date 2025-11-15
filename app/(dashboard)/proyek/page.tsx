"use client";
import "leaflet/dist/leaflet.css";
import { DataTable } from "@/components/data-table";
import { projectColumns } from "@/components/proyek/proyek-columns";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store/project-store";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ProyekForm } from "@/components/proyek/ProyekForm";
import { useState } from "react";

export default function Home() {
  const { projects } = useProjectStore();
  const [open, setOpen] = useState(false);

  return (
    <main className="p-6 space-y-6">
      <div style={{ position: "relative", zIndex: 0 }}>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "50vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <Button onClick={() => setOpen(true)}>Tambah Proyek</Button>
      <DataTable columns={projectColumns} data={projects} />

      <ProyekForm open={open} onOpenChange={setOpen} />
    </main>
  );
}
