// app/stakeholder/page.js
"use client";

import { useRouter } from "next/navigation";
import MapsView from "@/components/MapsView";
import Sidebar from "@/components/Sidebar";
import StakeholderStats from "@/components/StakeholderStats";
import StakeholderTable from "@/components/StakeholderTable";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

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
  {
    id: 4,
    nama: "Dinas PUPR",
    kategori: "Pemerintah",
    power: 3.0,
    interest: 2.5,
  },
  {
    id: 5,
    nama: "Kantor Tanah",
    kategori: "Pemerintah",
    power: 2.0,
    interest: 2.0,
  },
  {
    id: 6,
    nama: "Polres Cilegon",
    kategori: "Pemerintah",
    power: 4.5,
    interest: 5.0,
  },
];

export default function StakeholderPage() {
  const router = useRouter();

  const handleTambahStakeholder = () => {
    router.push("/tambahstakeholder"); // arahkan ke halaman form tambah proyek
  };

  return (
    <div className="flex min-h-screen bg-[#F2F2F2]">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 overflow-auto text-black">
        {/* WRAPPER AGAR KONSISTEN LEBARNYA */}
        <div className="max-w-screen-xl mx-auto w-full space-y-4">
          {/* MAP */}
          <MapsView />

          {/* SEARCH + BUTTON */}
          <div className="flex justify-between items-center w-306 pt-2">
            <button
              onClick={handleTambahStakeholder}
              className="font-semibold flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded mx-4"
            >
              <AddIcon sx={{ fontSize: 20 }} />
              Tambah Stakeholder
            </button>

            <div className="relative w-96 mx-4">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari nama stakeholder"
                className="font-semibold border border-gray-600 text-gray-900 pl-10 pr-3 py-2 rounded w-full"
              />
            </div>
          </div>

          {/* TABEL */}
          <div className="overflow-x-auto mx-4 w-298">
            <StakeholderTable data={dummyData} />
          </div>
        </div>
      </main>
    </div>
  );
}
