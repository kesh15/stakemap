"use client";
import { useRouter } from "next/navigation";

export default function FormLihatStakeholder() {
  const router = useRouter();

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

        {/* Kriteria */}
        {["Interest", "Influence", "Involvement"].map((kriteria, i) => (
          <div key={i} className="flex items-start mb-4">
            <label className="w-68 pt-2 font-medium">
              {`Kriteria ${kriteria}`}
            </label>
            <div className="flex gap-8">
              {["Kurang baik", "Cukup", "Sangat Baik"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={kriteria}
                    checked={label === "Sangat Baik"}
                    disabled
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Keterikatan */}
        <div className="flex items-center">
          <label className="w-1/3">Keterikatan Stakeholder</label>
          <input
            type="text"
            className="border w-full p-2 rounded bg-gray-100"
            value="Lurah, Sekda"
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
      </form>
    </div>
  );
}
