"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormUbahStakeholder() {
  const router = useRouter();

  // State untuk form
  const [nama, setNama] = useState("Walikota");
  const [kontak, setKontak] = useState("081234567890");
  const [alamat, setAlamat] = useState("Jl. Merdeka No. 123, Cilegon");
  const [kelurahan, setKelurahan] = useState("Krenceng");
  const [kecamatan, setKecamatan] = useState("Krenceng");
  const [power, setPower] = useState(4.5);
  const [interest, setInterest] = useState(5);
  const [kategori, setKategori] = useState("Pemerintah");
  const [strategi, setStrategi] = useState("Kemitraan");
  const [kegiatan, setKegiatan] = useState("Melakukan sosialisasi pembangunan");
  const [tindakLanjut, setTindakLanjut] = useState("Mengadakan rapat koordinasi lanjutan");
  const [keterikatan, setKeterikatan] = useState("Lurah");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proses submit di sini, misalnya API call
    router.push("/stakeholder/pemerintah");
  };

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl max-w-6xl mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Data Stakeholder</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Form Input */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Nama Stakeholder</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Kontak Stakeholder</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={kontak}
            onChange={(e) => setKontak(e.target.value)}
          />
        </div>
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Alamat Stakeholder</label>
          <textarea
            className="border w-full p-2 rounded"
            rows="2"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </div>
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Kelurahan/Desa</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={kelurahan}
            onChange={(e) => setKelurahan(e.target.value)}
          />
        </div>
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Kecamatan</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
          />
        </div>

        {/* Skoring */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Skoring Power</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            className="border w-full p-2 rounded"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </div>

        <div className="flex items-start">
          <label className="w-1/3 pt-2">Skoring Interest</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            className="border w-full p-2 rounded"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
        </div>

        {/* Kategori & Strategi */}
        <div className="flex items-center">
          <label className="w-1/3">Kategori Stakeholder</label>
          <select
            className="border w-full p-2 rounded"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          >
            <option>Pemerintah</option>
            <option>Swasta</option>
            <option>Tokoh Masyarakat</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-1/3">Strategi Stakeholder</label>
          <select
            className="border w-full p-2 rounded"
            value={strategi}
            onChange={(e) => setStrategi(e.target.value)}
          >
            <option>Workshop</option>
            <option>Pendekatan Verbal</option>
            <option>Kemitraan</option>
          </select>
        </div>

        {/* Kegiatan & Tindak Lanjut */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Kegiatan Stakeholder</label>
          <textarea
            className="border w-full p-2 rounded"
            rows="2"
            value={kegiatan}
            onChange={(e) => setKegiatan(e.target.value)}
          />
        </div>
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Tindak Lanjut Stakeholder</label>
          <textarea
            className="border w-full p-2 rounded"
            rows="2"
            value={tindakLanjut}
            onChange={(e) => setTindakLanjut(e.target.value)}
          />
        </div>

        {/* Keterikatan */}
        <div className="flex items-center">
          <label className="w-1/3">Keterikatan Stakeholder</label>
          <div className="flex w-full">
            <input
              type="text"
              className="border w-full p-2 rounded-l"
              value={keterikatan}
              onChange={(e) => setKeterikatan(e.target.value)}
            />
            <button
              type="button"
              className="bg-gray-300 text-black px-4 rounded-r"
            >
              +
            </button>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
