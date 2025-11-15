"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, ProjectFormData } from "@/schema/proyek.schema";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useStakeholderStore } from "@/store/stakeholder-store";
import { Button } from "../ui/button";

type ProyekFormProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode?: "create" | "read" | "edit";
};
export function ProyekForm({
  open,
  onOpenChange,
  mode = "create",
}: ProyekFormProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      nama_proyek: "",
      alamat_proyek: "",
      koordinat: "",
      kategori_proyek: "",
      stakeholder_terlibat: [],
      tanggal_mulai: "",
      tanggal_selesai: "",
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const { stakeholders } = useStakeholderStore();

  const onSubmit = (data: ProjectFormData) => {
    console.log(data);
    // TODO: Implement submit logic
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] sm:max-w-[60vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Tambah Proyek"
              : mode === "edit"
              ? "Edit Proyek"
              : "Detail Proyek"}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <Field className="flex items-start gap-3">
                <FieldLabel htmlFor="nama_proyek">Nama Proyek</FieldLabel>
                <Input
                  type="text"
                  {...register("nama_proyek")}
                  id="nama_proyek"
                  placeholder="Nama Proyek"
                  required
                />
              </Field>
              {errors.nama_proyek && (
                <span className="text-sm text-red-600">
                  {errors.nama_proyek.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Field className="flex items-start gap-3">
                <FieldLabel htmlFor="koordinat">Koordinat</FieldLabel>
                <Input
                  type="text"
                  {...register("koordinat")}
                  id="koordinat"
                  placeholder="Koordinat"
                  required
                />
              </Field>
              {errors.koordinat && (
                <span className="text-sm text-red-600">
                  {errors.koordinat.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Field className="flex items-start gap-3">
                <FieldLabel htmlFor="kategori_proyek">Kategori</FieldLabel>
                <Input
                  type="text"
                  {...register("kategori_proyek")}
                  id="kategori_proyek"
                  placeholder="Kategori"
                  required
                />
              </Field>
              {errors.kategori_proyek && (
                <span className="text-sm text-red-600">
                  {errors.kategori_proyek.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Field className="flex items-start gap-3">
                <FieldLabel htmlFor="kategori_proyek">Kategori</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sosial">Sosial</SelectItem>
                    <SelectItem value="teknologi">Teknologi</SelectItem>
                    <SelectItem value="pendidikan">Pendidikan</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              {errors.kategori_proyek && (
                <span className="text-sm text-red-600">
                  {errors.kategori_proyek.message}
                </span>
              )}
            </div>
           
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
