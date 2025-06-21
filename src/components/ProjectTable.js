// src/components/ProyekTable.js

export default function ProjectTable({ data }) {
  return (
    <table className="mt-6 w-full border border-gray-300 text-sm">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th rowSpan="2" className="p-2 align-middle">No</th>
          <th rowSpan="2" className="p-2 align-middle">Nama Proyek</th>
          <th rowSpan="2" className="p-2 align-middle">Kategori Proyek</th>
          <th rowSpan="2" className="p-2 align-middle">Stakeholder Berkontribusi</th>
          <th colSpan="2" className="p-2">Rata-Rata</th>
          <th rowSpan="2" className="p-2 align-middle">Aksi</th>
        </tr>
        <tr>
          <th className="p-2">Power</th>
          <th className="p-2">Interest</th>
        </tr>
      </thead>
      <tbody>
        {data.map((project, i) => (
          <tr key={i} className="text-center border-t">
            <td className="p-2">{i + 1}</td>
            <td className="p-2">{project.nama}</td>
            <td className="p-2">{project.kategori}</td>
            <td className="p-2">{project.stakeholder}</td>
            <td className="p-2">{project.power}</td>
            <td className="p-2">{project.interest}</td>
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
