"use client";
import { useRouter } from "next/navigation";

export default function FormLihatProyek() {
  const router = useRouter();

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl max-w-6xl mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Data Proyek</h2>

      <div className="space-y-5">
        {/* Nama Proyek */}
        <div className="flex items-center">
          <label className="w-1/3">Nama Proyek</label>
          <input
            type="text"
            className="border w-full p-2 rounded bg-gray-100"
            value="Pembangunan Jalan Utama"
            readOnly
          />
        </div>

        {/* Alamat Proyek */}
        <div className="flex items-center">
          <label className="w-1/3">Alamat Proyek</label>
          <textarea
            className="border w-full p-2 rounded bg-gray-100"
            rows="2"
            value="Jl. Raya Merdeka No. 10, Jakarta"
            readOnly
          />
        </div>

        {/* Kelurahan/Desa */}
        <div className="flex items-center">
          <label className="w-1/3">Kelurahan/Desa</label>
          <input
            type="text"
            className="border w-full p-2 rounded bg-gray-100"
            value="Gambir"
            readOnly
          />
        </div>

        {/* Kecamatan */}
        <div className="flex items-center">
          <label className="w-1/3">Kecamatan</label>
          <input
            type="text"
            className="border w-full p-2 rounded bg-gray-100"
            value="Gambir"
            readOnly
          />
        </div>

        {/* Kategori Proyek */}
        <div className="flex items-center">
          <label className="w-1/3">Kategori Proyek</label>
          <select
            className="border w-full p-2 rounded bg-gray-100"
            value="Sosial"
            disabled
          >
            <option>Sosial</option>
          </select>
        </div>

        {/* Stakeholder Terlibat */}
        <div className="flex items-center">
          <label className="w-1/3">Stakeholder yang Terlibat</label>
          <input
            type="text"
            className="border w-full p-2 rounded bg-gray-100"
            value="Dinas PU, Masyarakat Sekitar"
            readOnly
          />
        </div>

        {/* Tanggal Mulai */}
        <div className="flex items-center">
          <label className="w-1/3">Tanggal Mulai Proyek</label>
          <input
            type="date"
            className="border w-full p-2 rounded bg-gray-100"
            value="2024-01-01"
            readOnly
          />
        </div>

        {/* Tanggal Berakhir */}
        <div className="flex items-center">
          <label className="w-1/3">Tanggal Berakhir Proyek</label>
          <input
            type="date"
            className="border w-full p-2 rounded bg-gray-100"
            value="2024-12-31"
            readOnly
          />
        </div>

        {/* Tombol Kembali */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded"
            onClick={() => router.back()}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
