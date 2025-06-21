'use client';

import { useRouter } from 'next/navigation';
import MapsView from "@/components/MapsView";
import Sidebar from "@/components/Sidebar";
import PemetaanTable from "@/components/PemetaanTable";

const dummyData= [
  {
    id: 1,
    kecamatan: "Kecamatan Cipandan",
    kelurahan: "Kelurahan Randamari",
    ring: "Ring 1",
  },
  {
    id: 2,
    kecamatan: "Kecamatan Cipandan",
    kelurahan: "Kelurahan Tegalratu",
    ring: "Ring 1",
  },
  {
    id: 3,
    kecamatan: "Kecamatan Citangkul",
    kelurahan: "Kelurahan Kebonjeruk",
    ring: "Ring 2",
  },
  {
    id: 4,
    kecamatan: "Kecamatan Grogol",
    kelurahan: "Kelurahan Kotasari",
    ring: "Ring 2",
  },
];

export default function PemetaanWilayahPage() {
  const router = useRouter();

  const handleTambahWilayah = () => {
    router.push('/tambahwilayah'); // arahkan ke halaman form tambah proyek
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 ml-60 overflow-auto bg-[#0f172a] text-white">
        <MapsView />

        <div className="mt-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Cari nama kecamatan"
            className="border border-gray-600 bg-black text-white px-3 py-2 rounded w-1/2"
          />
          <button 
          onClick={handleTambahWilayah}
          className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Pemetaan Wilayah
          </button>
        </div>

        <PemetaanTable data={dummyData} />
      </main>
    </div>
  );
}
