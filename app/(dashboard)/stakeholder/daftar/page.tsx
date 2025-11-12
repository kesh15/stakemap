"use client";

import { DataTable } from "@/components/data-table";
import { stakeholderColumns } from "@/components/dummy-data";
import { StakeholderForm } from "@/components/stakeholder/StakeholderForm";
import { Button } from "@/components/ui/button";
import { StakeholderType, useStakeholderStore } from "@/hooks/store/stakeholder-store";
import { StakeholderInput } from "@/schema/stakeholder.schema";
import { useState } from "react";

export default function Page() {
  const { stakeholders, modalOpen, modalMode, selectedStakeholder, setModal } =
    useStakeholderStore();
  return (
    <main className="p-6 space-y-6">
      <Button onClick={() => setModal(true, "create")}>
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
