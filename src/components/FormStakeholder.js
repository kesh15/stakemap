'use client';
import { useRouter } from 'next/navigation';

export default function FormStakeholder() {
    const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // (Opsional) Validasi atau simpan data ke server di sini

    // Navigasi ke halaman proyek setelah submit
    router.push('/stakeholder');
  };
  
    return (
    <div className="bg-white text-black p-8 rounded shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Data Stakeholder</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>

        {[
          ["Nama Stakeholder", "text", "Masukan nama stakeholder"],
          ["Kontak Stakeholder", "text", "Masukan nomor kontak stakeholder"],
          ["Alamat Stakeholder", "textarea", "Masukan alamat stakeholder"],
          ["Kelurahan/Desa", "text", "Masukan kelurahan/desa"],
          ["Kecamatan", "text", "Masukan kecamatan"],
          ["Skoring Power Stakeholder", "number", "Masukan nilai skoring power stakeholder"],
          ["Skoring Interest Stakeholder", "number", "Masukan nilai skoring interest stakeholder"]
        ].map(([label, type, placeholder], index) => (
          <div key={index} className="flex items-start">
            <label className="w-1/3 pt-2">{label}</label>
            {type === "textarea" ? (
              <textarea className="border w-full p-2 rounded" placeholder={placeholder} rows="2" />
            ) : (
              <input type={type} className="border w-full p-2 rounded" placeholder={placeholder} />
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
          </select>
        </div>

        {/* Kegiatan & Tindak Lanjut */}
        {[
          ["Kegiatan Stakeholder", "textarea", "Masukan kegiatan stakeholder"],
          ["Tindak Lanjut Stakeholder", "textarea", "Masukan tindak lanjut stakeholder"]
        ].map(([label, type, placeholder], index) => (
          <div key={index} className="flex items-start">
            <label className="w-1/3 pt-2">{label}</label>
            <textarea className="border w-full p-2 rounded" placeholder={placeholder} rows="2" />
          </div>
        ))}

        {/* Kriteria */}
        {["Interest", "Influence", "Involvement"].map((kriteria, i) => (
          <div key={i}>
            <label className="block mb-1">{`Kriteria ${kriteria}`}</label>
            <div className="flex gap-6">
              {["Kurang baik", "Cukup", "Sangat Baik"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-1">
                  <input type="radio" name={kriteria} />
                  {label}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Keterikatan */}
        <div className="flex items-center">
          <label className="w-1/3">Keterikatan Stakeholder</label>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Keterikatan dengan stakeholder yang lain"
              className="border w-full p-2 rounded-l"
            />
            <button type="button" className="bg-gray-300 text-black px-4 rounded-r">+</button>
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
