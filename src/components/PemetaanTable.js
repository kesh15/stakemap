"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalHapus from "./ModalHapus";

export default function PemetaanTable({ data }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log(`Deleted id ${selectedId}`);
    setShowModal(false);
    router.push("/wilayah/deleted"); // ✅ Redirect ke halaman konfirmasi hapus wilayah
  };

  return (
    <>
      <table className="mt-6 w-full border border-gray-700 text-sm">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-2">No</th>
            <th className="p-2">Kecamatan</th>
            <th className="p-2">Kelurahan</th>
            <th className="p-2">Ring</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="text-center border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{item.kecamatan}</td>
              <td className="p-2">{item.kelurahan}</td>
              <td className="p-2">{item.ring}</td>
              <td className="p-2 space-x-2">
                <button
                  title="Lihat"
                  onClick={() => router.push("/lihatwilayah")}
                >
                  🔍
                </button>
                <button
                  title="Edit"
                  onClick={() => router.push("/ubahwilayah")}
                >
                  ✏️
                </button>
                <button title="Hapus" onClick={() => handleDelete(item.id)}>
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
