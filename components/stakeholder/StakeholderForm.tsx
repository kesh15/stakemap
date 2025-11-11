"use client";

import { useStakeholderStore } from "@/hooks/store/stakeholder-store";
import { useForm } from "react-hook-form";
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

export function StakeholderForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const addStakeholder = useStakeholderStore((s) => s.addStakeholder);

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

  const interestValue = watch("kriteria_interest_stakeholder");

  const onSubmit = (data: StakeholderInput) => {
    const submissionData = {
      ...data,
      id: crypto.randomUUID(),
      kategori_stakeholder: data.kategori_stakeholder || "-",
      strategi_stakeholder: data.strategi_stakeholder || "-",
      kriteria_influence_stakeholder:
        data.kriteria_influence_stakeholder || "-",
      kriteria_involvement_stakeholder:
        data.kriteria_involvement_stakeholder || "-",
      keterikatan_stakeholder: data.keterikatan_stakeholder || "-",
    };

    addStakeholder(submissionData);

    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] sm:max-w-[60vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Stakeholder</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                <Label className="w-40 mt-2">Nama Stakeholder</Label>
                <Input className="flex-1" {...register("nama_stakeholder")} />
              </div>
              {errors.nama_stakeholder && (
                <p className="text-red-500 text-sm">
                  {errors.nama_stakeholder.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                <Label className="w-40 mt-2">Kontak</Label>
                <Input className="flex-1" {...register("kontak_stakeholder")} />
              </div>
              {errors.kontak_stakeholder && (
                <p className="text-red-500 text-sm">
                  {errors.kontak_stakeholder.message}
                </p>
              )}
            </div>

            {/* Kelurahan */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                <Label className="w-40 mt-2">Kelurahan</Label>
                <Input className="flex-1" {...register("kelurahan")} />
              </div>
              {errors.kelurahan && (
                <p className="text-red-500 text-sm">
                  {errors.kelurahan.message}
                </p>
              )}
            </div>

            {/* Kecamatan */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                <Label className="w-40 mt-2">Kecamatan</Label>
                <Input className="flex-1" {...register("kecamatan")} />
              </div>
              {errors.kecamatan && (
                <p className="text-red-500 text-sm">
                  {errors.kecamatan.message}
                </p>
              )}
            </div>

            {/* Skoring Power */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                <Label className="w-40 mt-2">Skoring Power</Label>
                <Input
                  type="number"
                  className="flex-1"
                  {...register("skoring_power_stakeholder", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              {errors.skoring_power_stakeholder && (
                <p className="text-red-500 text-sm">
                  {errors.skoring_power_stakeholder.message}
                </p>
              )}
            </div>

            {/* Skoring Interest */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                <Label className="w-40 mt-2">Skoring Interest</Label>
                <Input
                  type="number"
                  className="flex-1"
                  {...register("skoring_interest_stakeholder", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              {errors.skoring_interest_stakeholder && (
                <p className="text-red-500 text-sm">
                  {errors.skoring_interest_stakeholder.message}
                </p>
              )}
            </div>
          </div>

          {/* TEXTAREA */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-3">
              <Label className="w-40 mt-2">Alamat</Label>
              <Textarea
                className="flex-1"
                {...register("alamat_stakeholder")}
              />
            </div>
            {errors.alamat_stakeholder && (
              <p className="text-red-500 text-sm">
                {errors.alamat_stakeholder.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-3">
              <Label className="w-40 mt-2">Kegiatan</Label>
              <Textarea
                className="flex-1"
                {...register("kegiatan_stakeholder")}
              />
            </div>
            {errors.kegiatan_stakeholder && (
              <p className="text-red-500 text-sm">
                {errors.kegiatan_stakeholder.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-3">
              <Label className="w-40 mt-2">Tindak Lanjut</Label>
              <Textarea
                className="flex-1"
                {...register("tindak_lanjut_stakeholder")}
              />
            </div>
            {errors.tindak_lanjut_stakeholder && (
              <p className="text-red-500 text-sm">
                {errors.tindak_lanjut_stakeholder.message}
              </p>
            )}
          </div>

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
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="kurang" id="interest1" />
                  <Label htmlFor="interest1">Kurang baik</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="cukup" id="interest2" />
                  <Label htmlFor="interest2">Cukup</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="baik" id="interest3" />
                  <Label htmlFor="interest3">Sangat baik</Label>
                </div>
              </RadioGroup>
            </div>

            {errors.kriteria_interest_stakeholder && (
              <p className="text-red-500 text-sm">
                {errors.kriteria_interest_stakeholder.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Simpan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
