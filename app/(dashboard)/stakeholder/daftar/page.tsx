"use client";

import { DataTable } from "@/components/data-table";
import { stakeholderColumns } from "@/components/dummy-data";
import { StakeholderForm } from "@/components/stakeholder/StakeholderForm";
import { Button } from "@/components/ui/button";
import { useStakeholderStore } from "@/hooks/store/stakeholder-store";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);

  const stakeholders = useStakeholderStore((s) => s.stakeholders);

  return (
    <main className="p-6">
      <Button onClick={() => setOpen(true)}>Tambah Stakeholder</Button>

      <StakeholderForm open={open} onOpenChange={setOpen} />

      <div className="mt-6">
        <DataTable columns={stakeholderColumns} data={stakeholders} />
      </div>
    </main>
  );
}
