// app/stakeholder/page.js
"use client";

import { useRouter } from "next/navigation";
import MapsView from "@/components/MapsView";
import Sidebar from "@/components/Sidebar";
import StakeholderStats from "@/components/StakeholderStats";
import StakeholderTable from "@/components/StakeholderTable";

const dummyData = [
  {
    id: 1,
    nama: "Walikota",
    kategori: "Pemerintah",
    power: 4.5,
    interest: 5.0,
  },
  {
    id: 2,
    nama: "Sekda",
    kategori: "Pemerintah",
    power: 4.0,
    interest: 5.0,
  },
  {
    id: 3,
    nama: "Lurah",
    kategori: "Pemerintah",
    power: 4.0,
    interest: 5.0,
  },
];

export default function StakeholderPage() {
  const router = useRouter();

  const handleTambahStakeholder = () => {
    router.push("/tambahstakeholder"); // arahkan ke halaman form tambah proyek
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 overflow-auto bg-[#0f172a] text-white">
        {/* WRAPPER AGAR KONSISTEN LEBARNYA */}
        <div className="max-w-screen-xl mx-auto w-full space-y-4">
          {/* MAP */}
          <MapsView />

          {/* SEARCH + BUTTON */}
          <div className="flex justify-between items-center w-full">
            <input
              type="text"
              placeholder="Cari nama stakeholder"
              className="border border-gray-600 bg-black text-white px-3 py-2 rounded w-1/2 mx-4"
            />
            <button
              onClick={handleTambahStakeholder}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded mx-4"
            >
              Tambah Stakeholder
            </button>
          </div>

          {/* TABEL */}
          <div className="overflow-x-auto mx-4">
            <StakeholderTable data={dummyData} />
          </div>
        </div>
      </main>
    </div>
  );
}
