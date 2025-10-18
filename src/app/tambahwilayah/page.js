"use client";

import Sidebar from "@/components/Sidebar";
import FormWilayah from "@/components/FormWilayah";

export default function TambahWilayahPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 bg-white overflow-auto">
        <div className="max-w-[1400px] mx-auto w-full space-y-4">
          <FormWilayah />
        </div>
      </main>
    </div>
  );
}
