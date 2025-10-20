"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormUbahWilayah() {
  const router = useRouter();

  // State untuk input form
  const [kecamatan, setKecamatan] = useState("Cipandan");
  const [kelurahan, setKelurahan] = useState("Randamari");
  const [ring, setRing] = useState("Ring 1");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      kecamatan,
      kelurahan,
      ring,
    };

    // Simulasi penyimpanan data
    console.log("Data wilayah yang disimpan:", data);

    // Arahkan ke halaman wilayah setelah submit
    router.push("/wilayah");
  };

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl max-w-9xl mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Ubah Data Wilayah</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Kecamatan */}
        <div className="flex items-center">
          <label className="w-1/3">Kecamatan Wilayah</label>
          <input
            type="text"
            placeholder="Masukkan kecamatan"
            className="border w-full p-2 rounded"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
          />
        </div>

        {/* Kelurahan */}
        <div className="flex items-center">
          <label className="w-1/3">Kelurahan/Desa Wilayah</label>
          <input
            type="text"
            placeholder="Masukkan kelurahan/desa"
            className="border w-full p-2 rounded"
            value={kelurahan}
            onChange={(e) => setKelurahan(e.target.value)}
          />
        </div>

        {/* Ring */}
        <div className="flex items-center">
          <label className="w-1/3">Ring Wilayah</label>
          <select
            className="border w-full p-2 rounded bg-gray-100"
            value={ring}
            onChange={(e) => setRing(e.target.value)}
          >
            <option value="">Pilih ring wilayah</option>
            <option value="Ring 1">Ring 1</option>
            <option value="Ring 2">Ring 2</option>
            <option value="Ring 3">Ring 3</option>
          </select>
        </div>

        {/* Tombol */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
