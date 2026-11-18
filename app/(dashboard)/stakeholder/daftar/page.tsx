'use client';

import { DataTable } from '@/components/data-table';
import { StakeholderForm } from '@/components/stakeholder/StakeholderForm';
import { Button } from '@/components/ui/button';
import { stakeholderColumns } from '@/components/stakeholder/stakeholder-columns';
import { useStakeholderStore } from '@/store/stakeholder-store';
import { useEffect, useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);
  const { stakeholders } = useStakeholderStore();
  const fetchStakeholders = useStakeholderStore(
    (state) => state.fetchStakeholders
  );

  useEffect(() => {
    fetchStakeholders();
  }, [fetchStakeholders]);

  return (
    <div className='flex flex-1 flex-col gap-6 p-4 md:p-6'>
      <Button onClick={() => setOpen(true)} className='w-fit'>
        Tambah Stakeholder
      </Button>
      <DataTable columns={stakeholderColumns} data={stakeholders} />
      <StakeholderForm open={open} onOpenChange={setOpen} />
    </div>
  );
}
