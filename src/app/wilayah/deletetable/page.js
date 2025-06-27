"use client";

import { useRouter } from "next/navigation";
import MapsView from "@/components/MapsView";
import Sidebar from "@/components/Sidebar";
import PemetaanTable from "@/components/PemetaanTable";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const dummyData = [
  {
    id: 1,
    kecamatan: "Kecamatan Cipandan",
    kelurahan: "Kelurahan Tegalratu",
    ring: "Ring 1",
  },
  {
    id: 2,
    kecamatan: "Kecamatan Citangkul",
    kelurahan: "Kelurahan Kebonjeruk",
    ring: "Ring 2",
  },
  {
    id: 3,
    kecamatan: "Kecamatan Grogol",
    kelurahan: "Kelurahan Kotasari",
    ring: "Ring 2",
  },
];

export default function PemetaanWilayahPage() {
  const router = useRouter();

  const handleTambahWilayah = () => {
    router.push("/tambahwilayah");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 overflow-auto bg-[#F2F2F2] text-black">
        <div className="max-w-screen-xl mx-auto w-full space-y-4">
          {/* MAP */}
          <MapsView />

          {/* SEARCH + BUTTON */}
          <div className="flex justify-between items-center w-full">
            <button
              onClick={handleTambahWilayah}
              className="font-semibold flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded mx-4"
            >
              <AddIcon sx={{ fontSize: 20 }} />
              Tambah Wilayah
            </button>

            <div className="relative w-96 mx-4">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari nama wilayah"
                className="font-semibold border border-gray-600 text-gray-900 pl-10 pr-3 py-2 rounded w-full"
              />
            </div>
          </div>

          {/* TABEL */}
          <div className="overflow-x-auto mx-4">
            <PemetaanTable data={dummyData} />
          </div>
        </div>
      </main>
    </div>
  );
}
