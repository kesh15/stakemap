export default function PemetaanTable({ data }) {
  return (
    <table className="mt-6 w-full border border-gray-300 text-sm">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th className="p-2">Kecamatan</th>
          <th className="p-2">Kelurahan</th>
          <th className="p-2">Dropdown ring 1,2,3</th>
          <th className="p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className="text-center border-t">
            <td className="p-2">{item.kecamatan}</td>
            <td className="p-2">{item.kelurahan}</td>
            <td className="p-2">{item.ring}</td>
            <td className="p-2 space-x-2">
              <button title="Lihat">🔍</button>
              <button title="Edit">✏️</button>
              <button title="Hapus">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
