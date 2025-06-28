"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormProyek() {
  const router = useRouter();

  // Dummy daftar stakeholder
  const dummyStakeholders = [
    "Walikota",
    "Sekda",
    "Lurah",
    "Dinas PUPR",
    "Kantor Tanah",
    "Polres Cilegon",
  ];

  const [selectedStakeholders, setSelectedStakeholders] = useState([]);

  const handleStakeholderChange = (nama) => {
    setSelectedStakeholders((prev) =>
      prev.includes(nama)
        ? prev.filter((item) => item !== nama)
        : [...prev, nama]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      selectedStakeholders,
      // ...data form lainnya
    });

    router.push("/analisis");
  };

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl max-w-6xl mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Data Proyek</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Nama Proyek */}
        <div className="flex items-center">
          <label className="w-1/3">Nama Proyek</label>
          <input
            type="text"
            placeholder="Masukan nama proyek"
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Alamat Proyek */}
        <div className="flex items-center">
          <label className="w-1/3">Alamat Proyek</label>
          <textarea
            placeholder="Masukan alamat proyek"
            className="border w-full p-2 rounded"
            rows="2"
          />
        </div>

        {/* Kelurahan/Desa */}
        <div className="flex items-center">
          <label className="w-1/3">Kelurahan/Desa</label>
          <input
            type="text"
            placeholder="Masukan kelurahan/desa"
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Kecamatan */}
        <div className="flex items-center">
          <label className="w-1/3">Kecamatan</label>
          <input
            type="text"
            placeholder="Masukan kecamatan"
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Kategori Proyek */}
        <div className="flex items-center">
          <label className="w-1/3">Kategori Proyek</label>
          <select className="border w-full p-2 rounded bg-gray-200">
            <option>Pilih kategori proyek</option>
            <option>Sosial</option>
            <option>Teknologi</option>
            <option>Pendidikan</option>
          </select>
        </div>

        {/* Stakeholder Terlibat (Checkbox) */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Stakeholder Terlibat</label>
          <div className="flex flex-wrap gap-4 w-full">
            {dummyStakeholders.map((nama, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={nama}
                  checked={selectedStakeholders.includes(nama)}
                  onChange={() => handleStakeholderChange(nama)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                {nama}
              </label>
            ))}
          </div>
        </div>

        {/* Tanggal Mulai */}
        <div className="flex items-center">
          <label className="w-1/3">Tanggal Mulai Proyek</label>
          <input type="date" className="border w-full p-2 rounded" />
        </div>

        {/* Tanggal Berakhir */}
        <div className="flex items-center">
          <label className="w-1/3">Tanggal Berakhir Proyek</label>
          <input type="date" className="border w-full p-2 rounded" />
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded"
          >
            Tambah Proyek
          </button>
        </div>
      </form>
    </div>
  );
}
