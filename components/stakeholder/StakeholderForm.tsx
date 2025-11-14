"use client";

import { useEffect } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  StakeholderInput,
  StakeholderSchema,
} from "@/schema/stakeholder.schema";
import { useStakeholderStore } from "@/store/stakeholder-store";

type StakeholderFormProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode?: "create" | "read" | "edit";
  defaultValues?: Partial<StakeholderInput> & { id?: string };
};

export function StakeholderForm({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
}: StakeholderFormProps) {
  const addStakeholder = useStakeholderStore((s) => s.addStakeholder);
  const updateStakeholder = useStakeholderStore((s) => s.updateStakeholder);

  const form = useForm<StakeholderInput>({
    resolver: zodResolver(StakeholderSchema),
    defaultValues: {
      nama_stakeholder: "",
      kontak_stakeholder: "",
      alamat_stakeholder: "",
      kelurahan: "",
      kecamatan: "",
      skoring_power_stakeholder: 0,
      skoring_interest_stakeholder: 0,
      kegiatan_stakeholder: "",
      tindak_lanjut_stakeholder: "",
      kriteria_interest_stakeholder: undefined,
      kategori_stakeholder: "-",
      strategi_stakeholder: "-",
      kriteria_influence_stakeholder: "-",
      kriteria_involvement_stakeholder: "-",
      keterikatan_stakeholder: "-",
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

  // Prefill saat edit / read
  useEffect(() => {
    if (mode === "create") {
      reset({
        nama_stakeholder: "",
        kontak_stakeholder: "",
        alamat_stakeholder: "",
        kelurahan: "",
        kecamatan: "",
        skoring_power_stakeholder: 0,
        skoring_interest_stakeholder: 0,
        kegiatan_stakeholder: "",
        tindak_lanjut_stakeholder: "",
        kriteria_interest_stakeholder: undefined,
        kategori_stakeholder: "-",
        strategi_stakeholder: "-",
        kriteria_influence_stakeholder: "-",
        kriteria_involvement_stakeholder: "-",
        keterikatan_stakeholder: "-",
      });
    } else if (defaultValues) {
      reset(defaultValues);
    }
  }, [mode, defaultValues, reset]);

  const disabled = mode === "read";
  const interestValue = watch("kriteria_interest_stakeholder");

  const onSubmit = (data: StakeholderInput) => {
    const submissionData = {
      ...data,
      id: defaultValues?.id || crypto.randomUUID(),
      kategori_stakeholder: data.kategori_stakeholder || "-",
      strategi_stakeholder: data.strategi_stakeholder || "-",
      kriteria_influence_stakeholder:
        data.kriteria_influence_stakeholder || "-",
      kriteria_involvement_stakeholder:
        data.kriteria_involvement_stakeholder || "-",
      keterikatan_stakeholder: data.keterikatan_stakeholder || "-",
    };

    if (mode === "edit") {
      updateStakeholder(submissionData);
    } else {
      addStakeholder(submissionData);
    }

    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] sm:max-w-[60vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Tambah Stakeholder"
              : mode === "edit"
              ? "Edit Stakeholder"
              : "Detail Stakeholder"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* GRID INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Stakeholder */}
            <InputField
              label="Nama Stakeholder"
              name="nama_stakeholder"
              register={register}
              errors={errors}
              disabled={disabled}
            />
            <InputField
              label="Kontak"
              name="kontak_stakeholder"
              register={register}
              errors={errors}
              disabled={disabled}
            />
            <InputField
              label="Kelurahan"
              name="kelurahan"
              register={register}
              errors={errors}
              disabled={disabled}
            />
            <InputField
              label="Kecamatan"
              name="kecamatan"
              register={register}
              errors={errors}
              disabled={disabled}
            />
            <InputField
              label="Skoring Power"
              name="skoring_power_stakeholder"
              register={register}
              errors={errors}
              disabled={disabled}
              type="number"
            />
            <InputField
              label="Skoring Interest"
              name="skoring_interest_stakeholder"
              register={register}
              errors={errors}
              disabled={disabled}
              type="number"
            />
          </div>

          {/* TEXTAREAS */}
          <TextareaField
            label="Alamat"
            name="alamat_stakeholder"
            register={register}
            errors={errors}
            disabled={disabled}
          />
          <TextareaField
            label="Kegiatan"
            name="kegiatan_stakeholder"
            register={register}
            errors={errors}
            disabled={disabled}
          />
          <TextareaField
            label="Tindak Lanjut"
            name="tindak_lanjut_stakeholder"
            register={register}
            errors={errors}
            disabled={disabled}
          />

          {/* RADIO */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <Label className="w-40 mt-2">Kriteria Interest</Label>
              <RadioGroup
                className="flex gap-5 flex-1"
                value={interestValue}
                onValueChange={(val) =>
                  setValue(
                    "kriteria_interest_stakeholder",
                    val as "kurang" | "cukup" | "baik"
                  )
                }
                disabled={disabled}
              >
                {["kurang", "cukup", "baik"].map((v, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <RadioGroupItem value={v} id={`interest-${v}`} />
                    <Label htmlFor={`interest-${v}`}>
                      {v === "kurang"
                        ? "Kurang Baik"
                        : v === "cukup"
                        ? "Cukup"
                        : "Sangat Baik"}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {errors.kriteria_interest_stakeholder && (
              <p className="text-red-500 text-sm">
                {errors.kriteria_interest_stakeholder.message}
              </p>
            )}
          </div>

          {mode !== "read" && (
            <Button type="submit" className="w-full">
              {mode === "edit" ? "Update" : "Simpan"}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

function InputField({
  label,
  name,
  register,
  errors,
  disabled,
  type = "text",
}: {
  label: string;
  name: keyof StakeholderInput;
  register: UseFormRegister<StakeholderInput>;
  errors: FieldErrors<StakeholderInput>;
  disabled?: boolean;
  type?: "text" | "number";
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-3">
        <Label className="w-40 mt-2">{label}</Label>
        <Input
          type={type}
          className="flex-1"
          {...register(name, type === "number" ? { valueAsNumber: true } : {})}
          disabled={disabled}
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}

function TextareaField({
  label,
  name,
  register,
  errors,
  disabled,
}: {
  label: string;
  name: keyof StakeholderInput;
  register: UseFormRegister<StakeholderInput>;
  errors: FieldErrors<StakeholderInput>;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-3">
        <Label className="w-40 mt-2">{label}</Label>
        <Textarea className="flex-1" {...register(name)} disabled={disabled} />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
