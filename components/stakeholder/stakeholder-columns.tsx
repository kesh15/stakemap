'use client';

import { useStakeholderStore } from '@/store/stakeholder-store';
import { StakeholderType } from '@/types/stakeholder';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { StakeholderForm } from './StakeholderForm';

export const stakeholderColumns: ColumnDef<StakeholderType>[] = [
  {
    accessorKey: 'nama_stakeholder',
    header: 'Nama',
  },
  {
    accessorKey: 'kontak_stakeholder',
    header: 'Kontak',
  },
  {
    accessorKey: 'kelurahan',
    header: 'Kelurahan',
  },
  {
    accessorKey: 'kecamatan',
    header: 'Kecamatan',
  },
  {
    accessorKey: 'skoring_power_stakeholder',
    header: 'Power',
  },
  {
    accessorKey: 'skoring_interest_stakeholder',
    header: 'Interest',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const stakeholder = row.original;

      return <StakeholderAction data={stakeholder} />;
    },
  },
];

const StakeholderAction = ({ data }: { data: StakeholderType }) => {
  const deleteStakeholder = useStakeholderStore((s) => s.removeStakeholder);
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState<'read' | 'edit'>('read');

  const handleView = () => {
    setMode('read');
    setOpenDialog(true);
  };

  const handleEdit = () => {
    setMode('edit');
    setOpenDialog(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={handleView}>Lihat Data</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>Ubah Data</DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteStakeholder(data.id)}>
            Hapus Data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StakeholderForm
        open={openDialog}
        onOpenChange={setOpenDialog}
        mode={mode}
        data={data}
      />
    </>
  );
};
