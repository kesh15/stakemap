"use client";

export default function KomunikasiStrategis() {
  const data = [
    {
      stakeholder: "Walikota",
      strategi: "Kemitraan dan penyediaan Informasi",
      kegiatan: [
        "Adakan workshop atau sesi diskusi yang melibatkan stakeholder serta anggota tim atau individu terkait lainnya.",
        "Pastikan survei mudah diisi dan relevan dengan tujuan stakeholder.",
      ],
      tindakLanjut: [
        "Kirimkan informasi tambahan atau pembaruan yang relevan setelah kegiatan atau pertemuan.",
        "Libatkan stakeholder dalam proses pengambilan keputusan dan pastikan mereka merasa bagian dari rencana tersebut.",
      ],
      waktu: "Minggu I Mei – Minggu III Juni 2025",
    },
    {
      stakeholder: "Dinas PUPR",
      strategi: "Kemitraan dan penyediaan Informasi",
      kegiatan: [
        "Adakan workshop atau sesi diskusi yang melibatkan stakeholder serta anggota tim atau individu terkait lainnya.",
        "Pastikan survei mudah diisi dan relevan dengan tujuan stakeholder.",
      ],
      tindakLanjut: [
        "Kirimkan informasi tambahan atau pembaruan yang relevan setelah kegiatan atau pertemuan.",
        "Libatkan stakeholder dalam proses pengambilan keputusan dan pastikan mereka merasa bagian dari rencana tersebut.",
      ],
      waktu: "Minggu I Mei – Minggu III Juni 2025",
    },
  ];

  return (
    <div className="space-y-6 bg-gray-100 p-6 rounded">
      {data.map((item, index) => (
        <div key={index} className=" rounded">
          <h3 className="font-semibold text-lg px-4 pt-4">
            {index + 1}. {item.stakeholder}
          </h3>
          <table className="w-full text-left border-collapse mt-2">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-300 px-3 py-2">Strategi</th>
                <th className="border border-gray-300 px-3 py-2">Kegiatan</th>
                <th className="border border-gray-300 px-3 py-2">
                  Tindak Lanjut
                </th>
                <th className="border border-gray-300 px-3 py-2">
                  Waktu Pelaksanaan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-300 px-3 py-2 align-top">
                  {item.strategi}
                </td>
                <td className="border border-gray-300 px-3 py-2 align-top">
                  <ul className="list-disc pl-4">
                    {item.kegiatan.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 px-3 py-2 align-top">
                  <ul className="list-disc pl-4">
                    {item.tindakLanjut.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 px-3 py-2 align-top">
                  {item.waktu}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
