"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { StakeholderType } from "@/hooks/store/stakeholder-store";

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
];
