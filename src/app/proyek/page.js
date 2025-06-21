'use client';

import { useRouter } from 'next/navigation';
import MapsView from "@/components/MapsView";
import Sidebar from "@/components/Sidebar";
import ProjectTable from "@/components/ProjectTable";

const dummyData = [
  {
    id: 1,
    nama: "Taman Kencana",
    kategori: "Sosial",
    stakeholder: "Pemerintah, Tokoh Pemuda",
    power: 4.0,
    interest: 4.0,
  },
  {
    id: 2,
    nama: "Cahaya Literasi",
    kategori: "Sosial",
    stakeholder: "Pemerintah, Tokoh Pemuda",
    power: 4.0,
    interest: 4.0,
  },
  {
    id: 3,
    nama: "Lentera Cahaya",
    kategori: "Sosial",
    stakeholder: "Pemerintah, Tokoh Pemuda",
    power: 4.0,
    interest: 4.0,
  },
  {
    id: 4,
    nama: "Tangan Teknologi",
    kategori: "Teknologi",
    stakeholder: "Pemerintah, Tokoh Pemuda",
    power: 4.0,
    interest: 4.0,
  },
  {
    id: 5,
    nama: "Kampung Literasi",
    kategori: "Pendidikan",
    stakeholder: "Pemerintah, Tokoh Pemuda",
    power: 4.0,
    interest: 4.0,
  },
];

export default function ProyekPage() {
  const router = useRouter();

  const handleTambahProyek = () => {
    router.push('/tambahproyek'); // arahkan ke halaman form tambah proyek
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 overflow-auto bg-[#0f172a] text-white">
        <div className="max-w-screen-xl mx-auto w-full space-y-4">

          {/* MAP */}
          <MapsView />

          {/* SEARCH + BUTTON */}
          <div className="flex justify-between items-center w-full">
            <input
              type="text"
              placeholder="Cari nama proyek"
              className="border border-gray-600 bg-black text-white px-3 py-2 rounded w-1/2"
            />
            <button
              onClick={handleTambahProyek}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Tambah Proyek
            </button>
          </div>

          {/* TABEL */}
          <div className="overflow-x-auto">
            <ProjectTable data={dummyData} />
          </div>

        </div>
      </main>
    </div>
  );
}
