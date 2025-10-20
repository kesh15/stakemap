"use client";

import Sidebar from "@/components/Sidebar";
import FormLihatStakeholder from "@/components/FormLihatStakeholder";

export default function LihatStakeholderPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 overflow-auto bg-white text-black">
        <div className="max-w-screen-xl mx-auto w-full space-y-4">
          <FormLihatStakeholder />
        </div>
      </main>
    </div>
  );
}
