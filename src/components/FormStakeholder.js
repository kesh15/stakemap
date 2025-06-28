"use client";
import { useRouter } from "next/navigation";

export default function FormStakeholder() {
  const router = useRouter();

  const dummyData = [
    { id: 1, nama: "Sekda", kategori: "Pemerintah", power: 4.0, interest: 5.0 },
    { id: 2, nama: "Lurah", kategori: "Pemerintah", power: 4.0, interest: 5.0 },
    { id: 3, nama: "Dinas PUPR", kategori: "Pemerintah", power: 3.0, interest: 2.5 },
    { id: 4, nama: "Kantor Tanah", kategori: "Pemerintah", power: 2.0, interest: 2.0 },
    { id: 5, nama: "Polres Cilegon", kategori: "Pemerintah", power: 4.5, interest: 5.0 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
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
        {[
          ["Nama Stakeholder", "text", "Masukan nama stakeholder"],
          ["Kontak Stakeholder", "text", "Masukan nomor kontak stakeholder"],
          ["Alamat Stakeholder", "textarea", "Masukan alamat stakeholder"],
          ["Kelurahan/Desa", "text", "Masukan kelurahan/desa"],
          ["Kecamatan", "text", "Masukan kecamatan"],
        ].map(([label, type, placeholder], index) => (
          <div key={index} className="flex items-start">
            <label className="w-1/3 pt-2">{label}</label>
            {type === "textarea" ? (
              <textarea
                className="border w-full p-2 rounded"
                placeholder={placeholder}
                rows="2"
              />
            ) : label === "Kontak Stakeholder" ? (
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="border w-full p-2 rounded"
                placeholder={placeholder}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            ) : (
              <input
                type={type}
                className="border w-full p-2 rounded"
                placeholder={placeholder}
              />
            )}
          </div>
        ))}

        {/* Kategori & Strategi */}
        <div className="flex items-center">
          <label className="w-1/3">Kategori Stakeholder</label>
          <select className="border w-full p-2 rounded bg-gray-200">
            <option>Pilih kategori stakeholder</option>
            <option>Pemerintah</option>
            <option>Swasta</option>
            <option>Tokoh Masyarakat</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-1/3">Strategi Stakeholder</label>
          <select className="border w-full p-2 rounded bg-gray-200">
            <option>Pilih strategi stakeholder</option>
            <option>Workshop</option>
            <option>Pendekatan Verbal</option>
            <option>Kemitraan</option>
          </select>
        </div>

        {/* Kegiatan & Tindak Lanjut */}
        {[
          ["Kegiatan Stakeholder", "textarea", "Masukan kegiatan stakeholder"],
          ["Tindak Lanjut Stakeholder", "textarea", "Masukan tindak lanjut stakeholder"],
        ].map(([label, type, placeholder], index) => (
          <div key={index} className="flex items-start">
            <label className="w-1/3 pt-2">{label}</label>
            <textarea
              className="border w-full p-2 rounded"
              placeholder={placeholder}
              rows="2"
            />
          </div>
        ))}

        {/* Skoring Power */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Skoring Power Stakeholder</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            className="border w-full p-2 rounded"
            placeholder="Masukan nilai skoring power (0 - 5)"
          />
        </div>

        {/* Skoring Interest */}
        <div className="flex items-start">
          <label className="w-1/3 pt-2">Skoring Interest Stakeholder</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            className="border w-full p-2 rounded"
            placeholder="Masukan nilai skoring interest (0 - 5)"
          />
        </div>

        {/* Kriteria */}
        {[
          {
            nama: "Interest",
            opsi: [
              "Tertarik dengan kegiatan perusahaan",
              "Mendukung inisiatif sosial",
              "Memiliki kepentingan langsung",
            ],
          },
          {
            nama: "Influence",
            opsi: [
              "Pengambil keputusan utama",
              "Memiliki pengaruh terhadap masyarakat",
              "Pengendali kebijakan",
            ],
          },
          {
            nama: "Involvement",
            opsi: [
              "Ikut rapat koordinasi",
              "Memberikan feedback reguler",
              "Terlibat dalam pelaksanaan program",
            ],
          },
        ].map((kriteria, i) => (
          <div key={i} className="flex items-start mb-4">
            <label className="w-68 pt-2 font-medium">{`Kriteria ${kriteria.nama}`}</label>
            <div className="flex gap-8">
              {kriteria.opsi.map((label, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={kriteria.nama}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Keterikatan */}
        <div className="flex items-start mb-4">
          <label className="w-68 pt-2 font-medium">Keterikatan Stakeholder</label>
          <div className="flex gap-8">
            {dummyData.map((stakeholder) => (
              <label key={stakeholder.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="keterikatan"
                  value={stakeholder.nama}
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
            Tambah Stakeholder
          </button>
        </div>
      </form>
    </div>
  );
}
