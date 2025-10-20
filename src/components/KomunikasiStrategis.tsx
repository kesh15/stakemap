"use client";

import { useState } from "react";

export default function KomunikasiStrategis({ isEditable }) {
  const [data, setData] = useState([
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
  ]);

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const handleArrayChange = (index, field, subIndex, value) => {
    const updatedData = [...data];
    updatedData[index][field][subIndex] = value;
    setData(updatedData);
  };

  const handleAddKegiatan = (index) => {
    const updatedData = [...data];
    updatedData[index].kegiatan.push("");
    setData(updatedData);
  };

  const handleAddTindakLanjut = (index) => {
    const updatedData = [...data];
    updatedData[index].tindakLanjut.push("");
    setData(updatedData);
  };

  const handleDeleteStakeholder = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleAddStakeholder = () => {
    setData([
      ...data,
      {
        stakeholder: "",
        strategi: "",
        kegiatan: [""],
        tindakLanjut: [""],
        waktu: "",
      },
    ]);
  };

  return (
    <div className="space-y-6 bg-gray-100 p-6 rounded">
      {data.map((item, index) => (
        <div key={index} className="rounded border p-4 bg-white space-y-4">
          {/* Stakeholder Name + Tombol Hapus */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">
              {index + 1}.{" "}
              {isEditable ? (
                <input
                  type="text"
                  value={item.stakeholder}
                  onChange={(e) =>
                    handleFieldChange(index, "stakeholder", e.target.value)
                  }
                  className="border p-1 w-full"
                  placeholder="Nama Stakeholder"
                />
              ) : (
                item.stakeholder
              )}
            </h3>

            {isEditable && (
              <button
                onClick={() => handleDeleteStakeholder(index)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border px-3 py-2">Strategi</th>
                <th className="border px-3 py-2">Kegiatan</th>
                <th className="border px-3 py-2">Tindak Lanjut</th>
                <th className="border px-3 py-2">Waktu Pelaksanaan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                {/* Strategi */}
                <td className="border px-3 py-2 align-top">
                  {isEditable ? (
                    <textarea
                      value={item.strategi}
                      onChange={(e) =>
                        handleFieldChange(index, "strategi", e.target.value)
                      }
                      className="border w-full p-1"
                      placeholder="Strategi"
                    />
                  ) : (
                    item.strategi
                  )}
                </td>

                {/* Kegiatan */}
                <td className="border px-3 py-2 align-top">
                  <ul className="list-disc pl-4 space-y-1">
                    {item.kegiatan.map((k, i) => (
                      <li key={i}>
                        {isEditable ? (
                          <input
                            type="text"
                            value={k}
                            onChange={(e) =>
                              handleArrayChange(index, "kegiatan", i, e.target.value)
                            }
                            className="border w-full p-1"
                            placeholder={`Kegiatan ${i + 1}`}
                          />
                        ) : (
                          k
                        )}
                      </li>
                    ))}
                  </ul>
                  {isEditable && (
                    <button
                      onClick={() => handleAddKegiatan(index)}
                      className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                      + Tambah Kegiatan
                    </button>
                  )}
                </td>

                {/* Tindak Lanjut */}
                <td className="border px-3 py-2 align-top">
                  <ul className="list-disc pl-4 space-y-1">
                    {item.tindakLanjut.map((t, i) => (
                      <li key={i}>
                        {isEditable ? (
                          <input
                            type="text"
                            value={t}
                            onChange={(e) =>
                              handleArrayChange(index, "tindakLanjut", i, e.target.value)
                            }
                            className="border w-full p-1"
                            placeholder={`Tindak Lanjut ${i + 1}`}
                          />
                        ) : (
                          t
                        )}
                      </li>
                    ))}
                  </ul>
                  {isEditable && (
                    <button
                      onClick={() => handleAddTindakLanjut(index)}
                      className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                      + Tambah Tindak Lanjut
                    </button>
                  )}
                </td>

                {/* Waktu */}
                <td className="border px-3 py-2 align-top">
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.waktu}
                      onChange={(e) =>
                        handleFieldChange(index, "waktu", e.target.value)
                      }
                      className="border w-full p-1"
                      placeholder="Waktu Pelaksanaan"
                    />
                  ) : (
                    item.waktu
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {/* Tombol Tambah Stakeholder */}
      {isEditable && (
        <button
          onClick={handleAddStakeholder}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Tambah Stakeholder Baru
        </button>
      )}
    </div>
  );
}
