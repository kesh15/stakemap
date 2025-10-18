"use client";

import { useRouter } from "next/navigation";

export default function FormWilayah() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi / penyimpanan data (opsional)

    router.push("/wilayah");
  };

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl w-full max-w-[1185px] mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Data Wilayah</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Kecamatan Wilayah */}
        <div className="flex items-center">
          <label className="w-1/3">Kecamatan Wilayah</label>
          <input
            type="text"
            placeholder="Masukan kecamatan"
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Kelurahan/Desa Wilayah */}
        <div className="flex items-center">
          <label className="w-1/3">Kelurahan/Desa Wilayah</label>
          <input
            type="text"
            placeholder="Masukan kelurahan/desa"
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Ring Wilayah */}
        <div className="flex items-center">
          <label className="w-1/3">Ring Wilayah</label>
          <select className="border w-full p-2 rounded bg-gray-100">
            <option value="">Pilih ring wilayah</option>
            <option value="Ring 1">Ring 1</option>
            <option value="Ring 2">Ring 2</option>
            <option value="Ring 3">Ring 3</option>
          </select>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded"
          >
            Tambah Wilayah
          </button>
        </div>
      </form>
    </div>
  );
}
