"use client";

import { DataTable } from "@/components/data-table";
import { StakeholderForm } from "@/components/stakeholder/StakeholderForm";
import { Button } from "@/components/ui/button";
import { stakeholderColumns } from "@/components/stakeholder/stakeholder-columns";
import { useStakeholderStore } from "@/store/stakeholder-store";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const { stakeholders } = useStakeholderStore();
  return (
    <main className="p-6 space-y-6">
      <Button onClick={() => setOpen(true)}>Tambah Stakeholder</Button>

      <DataTable columns={stakeholderColumns} data={stakeholders} />

      <StakeholderForm open={open} onOpenChange={setOpen} />
    </main>
  );
}
