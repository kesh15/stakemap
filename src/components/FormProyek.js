'use client';
import { useRouter } from 'next/navigation';

export default function FormProyek() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // (Opsional) Validasi atau simpan data ke server di sini

    // Navigasi ke halaman proyek setelah submit
    router.push('/proyek');
  };

  return (
    <div className="bg-white text-black p-8 rounded shadow-md max-w-4xl mx-auto mt-10">
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

        {/* Stakeholder Terlibat */}
        <div className="flex items-center">
          <label className="w-1/3">Stakeholder yang terlibat</label>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Tambahkan stakeholder yang terlibat"
              className="border w-full p-2 rounded-l"
            />
            <button
              type="button"
              className="bg-gray-300 text-black px-4 rounded-r"
            >
              +
            </button>
          </div>
        </div>

        {/* Tanggal Mulai */}
        <div className="flex items-center">
          <label className="w-1/3">Tanggal Mulai Proyek</label>
          <input
            type="date"
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Tanggal Berakhir */}
        <div className="flex items-center">
          <label className="w-1/3">Tanggal Berakhir Proyek</label>
          <input
            type="date"
            className="border w-full p-2 rounded"
          />
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
