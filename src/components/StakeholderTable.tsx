"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalHapus from "./ModalHapus";

export default function StakeholderTable({ data }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    // Simulasi hapus (kalau pakai backend bisa fetch API delete)
    console.log(`Deleted id ${selectedId}`);
    setShowModal(false);
    router.push("/stakeholder/deleted"); // Redirect ke halaman setelah hapus
  };

  return (
    <>
      <table className="mt-2 w-full border border-gray-700 text-sm">
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
                <button
                  title="Lihat"
                  onClick={() => router.push("/lihatstakeholder")}
                >
                  🔍
                </button>
                <button
                  title="Edit"
                  onClick={() => router.push("/ubahstakeholder")}
                >
                  ✏️
                </button>
                <button title="Hapus" onClick={() => handleDelete(s.id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalHapus
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
