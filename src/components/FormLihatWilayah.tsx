"use client";

import { useRouter } from "next/navigation";

export default function FormLihatWilayah() {
  const router = useRouter();

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl max-w-9xl mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Data Wilayah</h2>

      <div className="space-y-5">
        {/* Kecamatan Wilayah */}
        <div className="flex items-center">
          <label className="w-1/3">Kecamatan Wilayah</label>
          <input
            type="text"
            className="border w-full p-2 rounded bg-gray-100"
            value="Cipandan"
            readOnly
          />
        </div>

        {/* Kelurahan/Desa Wilayah */}
        <div className="flex items-center">
          <label className="w-1/3">Kelurahan/Desa Wilayah</label>
          <input
            type="text"
            className="border w-full p-2 rounded bg-gray-100"
            value="Randamari"
            readOnly
          />
        </div>

        {/* Ring Wilayah */}
        <div className="flex items-center">
          <label className="w-1/3">Ring Wilayah</label>
          <select
            className="border w-full p-2 rounded bg-gray-100"
            value="Ring 1"
            disabled
          >
            <option>Ring 1</option>
          </select>
        </div>

        {/* Tombol Kembali */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded"
            onClick={() => router.back()}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
