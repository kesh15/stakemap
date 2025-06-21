export default function StakeholderTable({ data }) {
  return (
    <table className="mt-6 w-full border border-gray-300 text-sm">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th className="p-2">No</th>
          <th className="p-2">Nama Stakeholder</th>
          <th className="p-2">Kategori</th>
          <th className="p-2">Power</th>
          <th className="p-2">Interest</th>
          <th className="p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s, i) => (
          <tr key={i} className="text-center border-t">
            <td className="p-2">{i + 1}</td>
            <td className="p-2">{s.nama}</td>
            <td className="p-2">{s.kategori}</td>
            <td className="p-2">{s.power}</td>
            <td className="p-2">{s.interest}</td>
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
