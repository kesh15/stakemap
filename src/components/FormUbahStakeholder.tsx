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
  const [keterikatan, setKeterikatan] = useState(["Sekda", "Lurah"]);
  const [kriteria, setKriteria] = useState({
    Interest: ["Tertarik pada tujuan proyek"],
    Influence: ["Punya pengaruh pada masyarakat"],
    Involvement: ["Mengikut setiap rapat proyek"],
  });

  const handleKeterikatanChange = (value) => {
    setKeterikatan((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleKriteriaChange = (kategori, value) => {
    setKriteria((prev) => {
      const isSelected = prev[kategori].includes(value);
      return {
        ...prev,
        [kategori]: isSelected
          ? prev[kategori].filter((item) => item !== value)
          : [...prev[kategori], value],
      };
    });
  };

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

  return (
    <div
      className="bg-white text-black p-8 rounded shadow-xl max-w-6xl mx-auto mt-10"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Data Stakeholder</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Input Teks */}
        {[["Nama Stakeholder", nama, setNama],
          ["Kontak Stakeholder", kontak, setKontak],
          ["Kelurahan/Desa", kelurahan, setKelurahan],
          ["Kecamatan", kecamatan, setKecamatan]].map(
          ([label, value, setter], index) => (
            <div key={index} className="flex items-start">
              <label className="w-1/3 pt-2">{label}</label>
              <input
                type="text"
                className="border w-full p-2 rounded"
                value={value}
                onChange={(e) => {
                  if (label === "Kontak Stakeholder") {
                    const angkaHanya = e.target.value.replace(/\D/g, "");
                    setter(angkaHanya);
                  } else {
                    setter(e.target.value);
                  }
                }}
              />
            </div>
          )
        )}

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

        {/* Dropdown */}
        {[["Kategori Stakeholder", kategori, setKategori, ["Pemerintah", "Swasta", "Tokoh Masyarakat"]],
          ["Strategi Stakeholder", strategi, setStrategi, ["Workshop", "Pendekatan Verbal", "Kemitraan"]]].map(
          ([label, value, setter, options], index) => (
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
          )
        )}

        {/* Kegiatan dan Tindak Lanjut */}
        {[["Kegiatan Stakeholder", kegiatan, setKegiatan],
          ["Tindak Lanjut Stakeholder", tindakLanjut, setTindakLanjut]].map(
          ([label, value, setter], index) => (
            <div key={index} className="flex items-start">
              <label className="w-1/3 pt-2">{label}</label>
              <textarea
                className="border w-full p-2 rounded"
                rows="2"
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
            </div>
          )
        )}

        {/* Skoring */}
        {[["Skoring Power", power, setPower],
          ["Skoring Interest", interest, setInterest]].map(
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
                onChange={(e) => setter(parseFloat(e.target.value))}
              />
            </div>
          )
        )}

        {/* Kriteria */}
        {Object.entries(kriteriaOptions).map(([kategori, opsiList], i) => (
          <div key={i} className={`flex items-start mb-4 kriteria-${kategori.toLowerCase()}`}>
            <label className="w-68 pt-2 font-medium">{`Kriteria ${kategori}`}</label>
            <div className="flex-1">
              {kategori === "Interest" ? (
                <div className="flex gap-6 flex-wrap">
                  {opsiList.map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={kategori}
                        value={label}
                        checked={kriteria[kategori].includes(label)}
                        onChange={() => handleKriteriaChange(kategori, label)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              ) : kategori === "Influence" ? (
                <div className="flex gap-4 flex-wrap">
                  {opsiList.map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={kategori}
                        value={label}
                        checked={kriteria[kategori].includes(label)}
                        onChange={() => handleKriteriaChange(kategori, label)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {opsiList.map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={kategori}
                        value={label}
                        checked={kriteria[kategori].includes(label)}
                        onChange={() => handleKriteriaChange(kategori, label)}
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

        {/* Tombol Submit */}
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
