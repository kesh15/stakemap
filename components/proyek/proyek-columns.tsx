"use client";

import { ProjectType } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";

export const projectColumns: ColumnDef<ProjectType>[] = [
  {
    accessorKey: "nama_proyek",
    header: "Nama Proyek",
  },
  {
    accessorKey: "kategori_proyek",
    header: "Kategori",
  },
  {
    header: "Stakeholder Terlibat",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="flex flex-col">
          {project.stakeholder_terlibat.map((s) => (
            <span key={s.id}>{s.nama_stakeholder}</span>
          ))}
        </div>
      );
    },
  },
  {
    header: "Average Power",
    cell: ({ row }) => {
      const stakeholder = row.original.stakeholder_terlibat;
      if (stakeholder.length === 0) return "-";
      const avg =
        stakeholder.reduce(
          (acc, curr) => acc + curr.skoring_power_stakeholder,
          0
        ) / stakeholder.length;
      return avg.toFixed(2);
    },
  },
  {
    header: "Average Interest",
    cell: ({ row }) => {
      const stakeholder = row.original.stakeholder_terlibat;
      if (stakeholder.length === 0) return "-";
      const avg =
        stakeholder.reduce(
          (acc, curr) => acc + curr.skoring_interest_stakeholder,
          0
        ) / stakeholder.length;
      return avg.toFixed(2);
    },
  },
];
