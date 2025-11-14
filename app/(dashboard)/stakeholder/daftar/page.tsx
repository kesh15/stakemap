"use client";

import { DataTable } from "@/components/data-table";
import { StakeholderForm } from "@/components/stakeholder/StakeholderForm";
import { Button } from "@/components/ui/button";
import { StakeholderInput } from "@/schema/stakeholder.schema";
import { stakeholderColumns } from "@/components/stakeholder/stakeholder-columns";
import { useStakeholderStore } from "@/store/stakeholder-store";

export default function Page() {
  const { stakeholders, modalOpen, modalMode, selectedStakeholder, setModal } =
    useStakeholderStore();
  return (
    <main className="p-6 space-y-6">
      <Button onClick={() => setModal(true, "create", null)}>
        Tambah Stakeholder
      </Button>

      <DataTable columns={stakeholderColumns} data={stakeholders} />

      <StakeholderForm
        open={modalOpen}
        onOpenChange={(v) => setModal(v)}
        mode={modalMode}
        defaultValues={selectedStakeholder as StakeholderInput}
      />
    </main>
  );
}
