"use client";
import { useRouter } from "next/navigation";

export default function FormLihatStakeholder() {
  const router = useRouter();

  const dummyData = [
    { id: 1, nama: "Sekda" },
    { id: 2, nama: "Lurah" },
    { id: 3, nama: "Dinas PUPR" },
    { id: 4, nama: "Kantor Tanah" },
    { id: 5, nama: "Polres Cilegon" },
  ];

  const kriteriaOptions = {
    Interest: [
      "Tertarik pada tujuan proyek",
      "Mendukung setiap program sosial",
      "Punya kepentingan langsung",
    ],
    Influence: [
      "Pengambil keputusan utama",
      "Punya pengaruh pada masyarakat",
      "Pengendali suatu kebijakan",
    ],
    Involvement: [
      "Mengikut setiap rapat proyek",
      "Memberikan masukan secara rutin",
      "Aktif dalam program",
    ],
  };

  const selectedKriteria = {
    Interest: ["Tertarik pada tujuan proyek"],
    Influence: ["Punya pengaruh pada masyarakat"],
    Involvement: ["Mengikut setiap rapat proyek"],
  };

  const keterikatan = ["Sekda", "Lurah"];

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl max-w-6xl mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Data Stakeholder</h2>

      <form className="space-y-6">
        {/* Input Teks */}
        {[
          ["Nama Stakeholder", "Walikota"],
          ["Kontak Stakeholder", "081234567890"],
          ["Alamat Stakeholder", "Jl. Merdeka No. 123, Cilegon"],
          ["Kelurahan/Desa", "Krenceng"],
          ["Kecamatan", "Krenceng"],
        ].map(([label, value], index) => (
          <div key={index} className="flex items-start">
            <label className="w-1/3 pt-2">{label}</label>
            {label === "Alamat Stakeholder" ? (
              <textarea
                className="border w-full p-2 rounded bg-gray-100"
                rows="2"
                readOnly
                value={value}
              />
            ) : (
              <input
                type="text"
                className="border w-full p-2 rounded bg-gray-100"
                readOnly
                value={value}
              />
            )}
          </div>
        ))}

        {/* Dropdown */}
        <div className="flex items-center">
          <label className="w-1/3">Kategori Stakeholder</label>
          <select
            className="border w-full p-2 rounded bg-gray-100"
            disabled
            value="Pemerintah"
          >
            <option>Pemerintah</option>
            <option>Swasta</option>
            <option>Tokoh Masyarakat</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/3">Strategi Stakeholder</label>
          <select
            className="border w-full p-2 rounded bg-gray-100"
            disabled
            value="Kemitraan"
          >
            <option>Workshop</option>
            <option>Pendekatan Verbal</option>
            <option>Kemitraan</option>
          </select>
        </div>

        {/* Kegiatan */}
        {[
          ["Kegiatan Stakeholder", "Melakukan sosialisasi pembangunan"],
          ["Tindak Lanjut Stakeholder", "Mengadakan rapat koordinasi lanjutan"],
        ].map(([label, value], index) => (
          <div key={index} className="flex items-start">
            <label className="w-1/3 pt-2">{label}</label>
            <textarea
              className="border w-full p-2 rounded bg-gray-100"
              rows="2"
              readOnly
              value={value}
            />
          </div>
        ))}

        {/* Skoring */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Skoring Power Stakeholder</label>
          <input
            type="number"
            className="border w-full p-2 rounded bg-gray-100"
            value="4.5"
            readOnly
          />
        </div>
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Skoring Interest Stakeholder</label>
          <input
            type="number"
            className="border w-full p-2 rounded bg-gray-100"
            value="5"
            readOnly
          />
        </div>

        {/* Kriteria Read Only */}
{Object.entries(kriteriaOptions).map(([namaKriteria, opsiList], i) => (
  <div key={i} className={`flex items-start mb-4 kriteria-${namaKriteria.toLowerCase()}`}>
    <label className="w-68 pt-2 font-medium">{`Kriteria ${namaKriteria}`}</label>
    <div className="flex-1">
      {namaKriteria === "Interest" ? (
        // Layout Interest: Horizontal
        <div className="flex gap-6 flex-wrap">
          {opsiList.map((label, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={namaKriteria}
                checked={selectedKriteria[namaKriteria]?.includes(label)}
                disabled
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              {label}
            </label>
          ))}
        </div>
      ) : namaKriteria === "Influence" ? (
        // Layout Influence: Grid 2 Kolom
        <div className="flex gap-4 flex-wrap">
          {opsiList.map((label, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={namaKriteria}
                checked={selectedKriteria[namaKriteria]?.includes(label)}
                disabled
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              {label}
            </label>
          ))}
        </div>
      ) : (
        // Layout Involvement: Flex Wrap
        <div className="flex flex-wrap gap-4">
          {opsiList.map((label, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={namaKriteria}
                checked={selectedKriteria[namaKriteria]?.includes(label)}
                disabled
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              {label}
            </label>
          ))}
        </div>
      )}
    </div>
  </div>
))}

        {/* Keterikatan Read Only */}
        <div className="flex items-start mb-4">
          <label className="w-1/3 pt-2">Keterikatan Stakeholder</label>
          <div className="flex flex-wrap gap-4 w-full">
            {dummyData.map((stakeholder) => (
              <label key={stakeholder.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={keterikatan.includes(stakeholder.nama)}
                  disabled
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                {stakeholder.nama}
              </label>
            ))}
          </div>
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
      </form>
    </div>
  );
}
