"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalHapus from "./ModalHapus";

export default function ProjectTable({ data }) {
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
    router.push("/proyek/deleted"); // Redirect setelah hapus
  };

  return (
    <>
      <table className="mt-2 w-full border border-gray-700 text-sm">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th rowSpan="2" className="p-2 align-middle">
              No
            </th>
            <th rowSpan="2" className="p-2 align-middle">
              Nama Proyek
            </th>
            <th rowSpan="2" className="p-2 align-middle">
              Kategori Proyek
            </th>
            <th rowSpan="2" className="p-2 align-middle">
              Stakeholder Berkontribusi
            </th>
            <th colSpan="2" className="p-2">
              Rata-Rata
            </th>
            <th rowSpan="2" className="p-2 align-middle">
              Aksi
            </th>
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
                <button title="Lihat" onClick={() => router.push("/analisis")}>
                  🔍
                </button>
                <button title="Edit" onClick={() => router.push("/analisis")}>
                  ✏️
                </button>
                <button title="Hapus" onClick={() => handleDelete(project.id)}>
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
