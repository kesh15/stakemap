"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  useStakeholderStore,
} from "@/store/stakeholder-store";
import { StakeholderType } from "@/types/stakeholder";

export const stakeholderColumns: ColumnDef<StakeholderType>[] = [
  {
    accessorKey: "nama_stakeholder",
    header: "Nama",
  },
  {
    accessorKey: "kontak_stakeholder",
    header: "Kontak",
  },
  {
    accessorKey: "kelurahan",
    header: "Kelurahan",
  },
  {
    accessorKey: "kecamatan",
    header: "Kecamatan",
  },
  {
    accessorKey: "skoring_power_stakeholder",
    header: "Power",
  },
  {
    accessorKey: "skoring_interest_stakeholder",
    header: "Interest",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const stakeholder = row.original;

      return <StakeholderAction data={stakeholder} />;
    },
  },
];

const StakeholderAction = ({ data }: { data: StakeholderType }) => {
  const setModal = useStakeholderStore((s) => s.setModal);
  const deleteStakeholder = useStakeholderStore((s) => s.removeStakeholder);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setModal(true, "read", data)}>
          Lihat Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setModal(true, "edit", data)}>
          Ubah Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteStakeholder(data.id)}>
          Hapus Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
