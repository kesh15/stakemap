"use client";

import { ProjectType } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useProjectStore } from "@/store/project-store";
import { useState } from "react";
import { ProyekForm } from "./ProyekForm";

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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original;

      return <ProjectAction data={project} />;
    },
  },
];

const ProjectAction = ({ data }: { data: ProjectType }) => {
  const deleteProject = useProjectStore((s) => s.removeProject);
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState<"read" | "edit">("read");

  const handleView = () => {
    setMode("read");
    setOpenDialog(true);
  };

  const handleEdit = () => {
    setMode("edit");
    setOpenDialog(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleView}>Lihat Data</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>Ubah Data</DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteProject(data.id)}>
            Hapus Data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProyekForm
        open={openDialog}
        onOpenChange={setOpenDialog}
        mode={mode}
        data={data}
      />
    </>
  );
};
