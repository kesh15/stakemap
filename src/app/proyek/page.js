"use client";

import { useRouter } from "next/navigation";
import MapsView from "@/components/MapsView";
import Sidebar from "@/components/Sidebar";
import ProjectTable from "@/components/ProjectTable";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const dummyData = [
  {
    id: 1,
    nama: "Cahaya Literasi",
    kategori: "Sosial",
    stakeholder: "Walikota",
    power: 4.5,
    interest: 5.0,
  },
  {
    id: 2,
    nama: "Taman Kencana",
    kategori: "Sosial",
    stakeholder: "Lurah, Walikota",
    power: 4.0,
    interest: 4.0,
  },
  {
    id: 3,
    nama: "Lentera Cahaya",
    kategori: "Sosial",
    stakeholder: "Sekda",
    power: 4.0,
    interest: 4.0,
  },
  {
    id: 4,
    nama: "Tangan Teknologi",
    kategori: "Teknologi",
    stakeholder: "Lurah",
    power: 4.0,
    interest: 4.0,
  },
  {
    id: 5,
    nama: "Kampung Literasi",
    kategori: "Pendidikan",
    stakeholder: "Lurah",
    power: 4.0,
    interest: 4.0,
  },
];

export default function ProyekPage() {
  const router = useRouter();

  const handleTambahProyek = () => {
    router.push("/tambahproyek"); // arahkan ke halaman form tambah proyek
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 overflow-auto bg-[#F2F2F2] text-black">
        <div className="max-w-screen-xl mx-auto w-full space-y-4">
          {/* MAP */}
          <MapsView />

          {/* SEARCH + BUTTON */}
          <div className="flex justify-between items-center w-full pt-2">
            <button
              onClick={handleTambahProyek}
              className="font-semibold flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded mx-4"
            >
              <AddIcon sx={{ fontSize: 20 }} />
              Tambah Proyek
            </button>

            <div className="relative w-96 mx-4">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari nama proyek"
                className="font-semibold border border-gray-600 text-gray-900 pl-10 pr-3 py-2 rounded w-full"
              />
            </div>
          </div>

          {/* TABEL */}
          <div className="overflow-x-auto mx-4">
            <ProjectTable data={dummyData} />
          </div>
        </div>
      </main>
    </div>
  );
}
