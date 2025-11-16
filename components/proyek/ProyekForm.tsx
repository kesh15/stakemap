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
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "../ui/multi-select";
import { useEffect, useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useProjectStore } from "@/store/project-store";
import { ProjectType } from "@/types/project";

type ProyekFormProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode?: "create" | "read" | "edit";
  data?: ProjectType | null;
};
export function ProyekForm({
  open,
  onOpenChange,
  mode = "create",
  data = null,
}: ProyekFormProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      nama_proyek: "",
      alamat_proyek: "",
      koordinat: "",
      kategori_proyek: "",
      stakeholder_terlibat: [],
      stakeholder_relations: [],
      radius: 0,
      tanggal_mulai: "",
      tanggal_selesai: "",
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const { stakeholders } = useStakeholderStore();
  const selectedStakeholders = watch("stakeholder_terlibat");
  const [relations, setRelations] = useState<{ from: string; to: string }[]>(
    []
  );

  const updateRelation = (index: number, key: "from" | "to", value: string) => {
    const newRelations = [...relations];
    newRelations[index][key] = value;
    setRelations(newRelations);
    setValue("stakeholder_relations", newRelations);

    // Auto-add new empty relation if both from and to are filled
    const currentRelation = newRelations[index];
    if (currentRelation.from && currentRelation.to) {
      const isLastRelation = index === newRelations.length - 1;
      if (isLastRelation) {
        setRelations([...newRelations, { from: "", to: "" }]);
      }
    }
  };

  const removeRelation = (index: number) => {
    const newRelations = relations.filter((_, i) => i !== index);
    setRelations(newRelations);
    setValue("stakeholder_relations", newRelations);
  };

  const getStakeholderName = (id: string) => {
    return stakeholders.find((s) => s.id === id)?.nama_stakeholder || "";
  };

  const [openTanggalMulai, setOpenTanggalMulai] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState<Date | undefined>(undefined);

  const [openTanggalSelesai, setOpenTanggalSelesai] = useState(false);
  const [tanggalSelesai, setTanggalSelesai] = useState<Date | undefined>(
    undefined
  );

  const addProject = useProjectStore((s) => s.addProject);
  const updateProject = useProjectStore((s) => s.updateProject);

  // Populate form with existing data for edit/read mode
  useEffect(() => {
    if (data && (mode === "edit" || mode === "read")) {
      // Set basic fields
      setValue("nama_proyek", data.nama_proyek);
      setValue("alamat_proyek", data.alamat_proyek);
      setValue("koordinat", data.koordinat);
      setValue("radius", data.radius);
      setValue("kategori_proyek", data.kategori_proyek);
      setValue("tanggal_mulai", data.tanggal_mulai);
      setValue("tanggal_selesai", data.tanggal_selesai);

      // Set stakeholder IDs
      const stakeholderIds = data.stakeholder_terlibat.map((s) => s.id);
      setValue("stakeholder_terlibat", stakeholderIds);

      // Set relations
      setValue("stakeholder_relations", data.stakeholder_relations);
      setRelations(
        data.stakeholder_relations.length > 0
          ? [...data.stakeholder_relations, { from: "", to: "" }]
          : [{ from: "", to: "" }]
      );

      // Set date states
      if (data.tanggal_mulai) {
        setTanggalMulai(new Date(data.tanggal_mulai));
      }
      if (data.tanggal_selesai) {
        setTanggalSelesai(new Date(data.tanggal_selesai));
      }
    } else if (mode === "create") {
      // Reset form for create mode
      form.reset();
      setTanggalMulai(undefined);
      setTanggalSelesai(undefined);
      setRelations([]);
    }
  }, [data, mode, open]);

  useEffect(() => {
    // Only auto-initialize relations for create mode
    // Don't reset relations when in edit/read mode
    if (mode === "create") {
      if (selectedStakeholders.length > 1) {
        setRelations([{ from: "", to: "" }]);
      } else {
        setRelations([]);
      }
      setValue("stakeholder_relations", []);
    }
  }, [selectedStakeholders, mode]);

  const onSubmit = (formData: ProjectFormData) => {
    // Convert stakeholder IDs to full stakeholder objects
    const selectedStakeholderObjects = stakeholders.filter((s) =>
      formData.stakeholder_terlibat.includes(s.id)
    );

    // Create/Update project object
    const projectData = {
      id: mode === "edit" && data ? data.id : crypto.randomUUID(),
      nama_proyek: formData.nama_proyek,
      alamat_proyek: formData.alamat_proyek,
      koordinat: formData.koordinat,
      radius: formData.radius,
      kategori_proyek: formData.kategori_proyek,
      stakeholder_terlibat: selectedStakeholderObjects,
      stakeholder_relations: formData.stakeholder_relations.filter(
        (rel) => rel.from && rel.to
      ), // Only include complete relations
      tanggal_mulai: formData.tanggal_mulai,
      tanggal_selesai: formData.tanggal_selesai,
    };

    if (mode === "edit") {
      updateProject(projectData);
      console.log("Project updated:", projectData);
    } else {
      addProject(projectData);
      console.log("Project added:", projectData);
    }

    // Close dialog after successful submission
    onOpenChange(false);
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
                  disabled={mode === "read"}
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
                <FieldLabel htmlFor="alamat_proyek">Alamat Proyek</FieldLabel>
                <Textarea
                  {...register("alamat_proyek")}
                  id="alamat_proyek"
                  placeholder="Alamat Proyek"
                  required
                  disabled={mode === "read"}
                />
              </Field>
              {errors.alamat_proyek && (
                <span className="text-sm text-red-600">
                  {errors.alamat_proyek.message}
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
                  disabled={mode === "read"}
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
                <FieldLabel htmlFor="radius">Radius</FieldLabel>
                <Input
                  type="number"
                  {...register("radius", { valueAsNumber: true })}
                  id="radius"
                  placeholder="Radius"
                  required
                  disabled={mode === "read"}
                />
              </Field>
              {errors.radius && (
                <span className="text-sm text-red-600">
                  {errors.radius.message}
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
                  disabled={mode === "read"}
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
                <FieldLabel htmlFor="stakeholder_terlibat">
                  Stakeholder Terlibat
                </FieldLabel>
                {mode === "read" ? (
                  <div className="flex flex-col gap-1">
                    {selectedStakeholders.map((id) => (
                      <span key={id} className="text-sm">
                        {getStakeholderName(id)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <MultiSelect
                    values={selectedStakeholders}
                    onValuesChange={(values) =>
                      setValue("stakeholder_terlibat", values)
                    }
                  >
                    <MultiSelectTrigger className="w-full max-w-[400px]">
                      <MultiSelectValue
                        placeholder="Pilih Stakeholder"
                        id="stakeholder_terlibat"
                      />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {stakeholders.map((stakeholder) => (
                          <MultiSelectItem
                            key={stakeholder.id}
                            value={stakeholder.id}
                          >
                            {stakeholder.nama_stakeholder}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                )}
              </Field>
              {errors.stakeholder_terlibat && (
                <span className="text-sm text-red-600">
                  {errors.stakeholder_terlibat.message}
                </span>
              )}
              {errors.kategori_proyek && (
                <span className="text-sm text-red-600">
                  {errors.kategori_proyek.message}
                </span>
              )}
            </div>
            {selectedStakeholders.length > 1 && (
              <div className="space-y-3 mt-4 col-span-2">
                <h3 className="font-semibold text-sm">Koneksi Stakeholder</h3>
                {relations.map((rel, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Select
                      value={rel.from}
                      onValueChange={(v) => updateRelation(index, "from", v)}
                      disabled={mode === "read"}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Pilih stakeholder" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedStakeholders.map((id) => (
                          <SelectItem key={id} value={id}>
                            {getStakeholderName(id)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="font-bold">to</span>

                    <Select
                      value={rel.to}
                      onValueChange={(v) => updateRelation(index, "to", v)}
                      disabled={mode === "read"}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Pilih stakeholder" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedStakeholders.map((id) => (
                          <SelectItem key={id} value={id}>
                            {getStakeholderName(id)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {relations.length > 1 && mode !== "read" && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeRelation(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <Field className="flex items-start gap-3">
                <FieldLabel htmlFor="tanggal_mulai">Tanggal Mulai</FieldLabel>
                <Popover
                  open={openTanggalMulai}
                  onOpenChange={setOpenTanggalMulai}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {tanggalMulai
                        ? tanggalMulai.toLocaleDateString()
                        : "Select date"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={tanggalMulai}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setTanggalMulai(date);
                        setValue(
                          "tanggal_mulai",
                          date ? date.toISOString().split("T")[0] : ""
                        );
                        setOpenTanggalMulai(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              {errors.tanggal_mulai && (
                <span className="text-sm text-red-600">
                  {errors.tanggal_mulai.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Field className="flex items-start gap-3">
                <FieldLabel htmlFor="tanggal_selesai">
                  Tanggal Selesai
                </FieldLabel>
                <Popover
                  open={openTanggalSelesai}
                  onOpenChange={setOpenTanggalSelesai}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                      disabled={mode === "read"}
                    >
                      {tanggalSelesai
                        ? tanggalSelesai.toLocaleDateString()
                        : "Select date"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={tanggalSelesai}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setTanggalSelesai(date);
                        setValue(
                          "tanggal_selesai",
                          date ? date.toISOString().split("T")[0] : ""
                        );
                        setOpenTanggalSelesai(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              {errors.tanggal_selesai && (
                <span className="text-sm text-red-600">
                  {errors.tanggal_selesai.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {mode === "read" ? "Tutup" : "Batal"}
            </Button>
            {mode !== "read" && (
              <Button type="submit">
                {mode === "create" ? "Tambah Proyek" : "Simpan Perubahan"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
