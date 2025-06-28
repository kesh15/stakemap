"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormUbahStakeholder() {
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
      "Tertarik dengan kegiatan perusahaan",
      "Mendukung inisiatif sosial",
      "Memiliki kepentingan langsung",
    ],
    Influence: [
      "Pengambil keputusan utama",
      "Memiliki pengaruh terhadap masyarakat",
      "Pengendali kebijakan",
    ],
    Involvement: [
      "Ikut rapat koordinasi",
      "Memberikan feedback reguler",
      "Terlibat dalam pelaksanaan program",
    ],
  };

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
  const [tindakLanjut, setTindakLanjut] = useState(
    "Mengadakan rapat koordinasi lanjutan"
  );
  const [keterikatan, setKeterikatan] = useState(["Sekda"]);
  const [kriteria, setKriteria] = useState({
    Interest: "Tertarik dengan kegiatan perusahaan",
    Influence: "Memiliki pengaruh terhadap masyarakat",
    Involvement: "Ikut rapat koordinasi",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nama,
      kontak,
      alamat,
      kelurahan,
      kecamatan,
      power,
      interest,
      kategori,
      strategi,
      kegiatan,
      tindakLanjut,
      keterikatan,
      kriteria,
    });
    router.push("/stakeholder/pemerintah");
  };

  const handleKeterikatanChange = (value) => {
    setKeterikatan((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleKriteriaChange = (kategori, value) => {
    setKriteria((prev) => ({
      ...prev,
      [kategori]: value,
    }));
  };

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl max-w-6xl mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Ubah Data Stakeholder</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Nama Stakeholder */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Nama Stakeholder</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        {/* Kontak Stakeholder - Angka Saja */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Kontak Stakeholder</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="border w-full p-2 rounded"
            value={kontak}
            onChange={(e) => {
              const angkaHanya = e.target.value.replace(/\D/g, "");
              setKontak(angkaHanya);
            }}
          />
        </div>

        {/* Kelurahan/Desa */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Kelurahan/Desa</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={kelurahan}
            onChange={(e) => setKelurahan(e.target.value)}
          />
        </div>

        {/* Kecamatan */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Kecamatan</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
          />
        </div>

        {/* Alamat */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Alamat Stakeholder</label>
          <textarea
            className="border w-full p-2 rounded"
            rows="2"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </div>

        {/* Select */}
        {[["Kategori Stakeholder", kategori, setKategori, ["Pemerintah", "Swasta", "Tokoh Masyarakat"]],
          ["Strategi Stakeholder", strategi, setStrategi, ["Workshop", "Pendekatan Verbal", "Kemitraan"]]
        ].map(([label, value, setter, options], index) => (
          <div key={index} className="flex items-center">
            <label className="w-1/3">{label}</label>
            <select
              className="border w-full p-2 rounded"
              value={value}
              onChange={(e) => setter(e.target.value)}
            >
              {options.map((opt, i) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Kegiatan dan Tindak Lanjut */}
        {[["Kegiatan Stakeholder", kegiatan, setKegiatan],
          ["Tindak Lanjut Stakeholder", tindakLanjut, setTindakLanjut]
        ].map(([label, value, setter], index) => (
          <div key={index} className="flex items-start">
            <label className="w-1/3 pt-2">{label}</label>
            <textarea
              className="border w-full p-2 rounded"
              rows="2"
              value={value}
              onChange={(e) => setter(e.target.value)}
            />
          </div>
        ))}

        {/* Skoring */}
        {[["Skoring Power", power, setPower], ["Skoring Interest", interest, setInterest]].map(
          ([label, value, setter], index) => (
            <div key={index} className="flex items-start">
              <label className="w-1/3 pt-2">{label}</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                className="border w-full p-2 rounded"
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
            </div>
          )
        )}

        {/* Kriteria */}
        {Object.entries(kriteriaOptions).map(([kategori, opsi], index) => (
          <div key={index} className="flex items-start mb-4">
            <label className="w-1/3 pt-2">{`Kriteria ${kategori}`}</label>
            <div className="flex flex-wrap gap-4 w-full">
              {opsi.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={kategori}
                    value={opt}
                    checked={kriteria[kategori] === opt}
                    onChange={() => handleKriteriaChange(kategori, opt)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Keterikatan */}
        <div className="flex items-start mb-4">
          <label className="w-1/3 pt-2">Keterikatan Stakeholder</label>
          <div className="flex flex-wrap gap-4 w-full">
            {dummyData.map((stakeholder) => (
              <label key={stakeholder.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={stakeholder.nama}
                  checked={keterikatan.includes(stakeholder.nama)}
                  onChange={() => handleKeterikatanChange(stakeholder.nama)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                {stakeholder.nama}
              </label>
            ))}
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
