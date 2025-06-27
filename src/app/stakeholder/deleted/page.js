"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function DeletedStakeholder() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 ml-64 overflow-auto bg-[#F2F2F2] text-black">
        <div className="max-w-screen-md mx-auto text-center mt-20">
          <h1 className="text-3xl font-bold mb-4">Data Berhasil Dihapus</h1>
          <p className="mb-6">
            Data stakeholder yang dipilih telah berhasil dihapus.
          </p>
          <button
            onClick={() => router.push("/stakeholder")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Kembali ke Daftar Stakeholder
          </button>
        </div>
      </main>
    </div>
  );
}
