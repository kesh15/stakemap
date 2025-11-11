import { z } from "zod";

export const StakeholderSchema = z.object({
  nama_stakeholder: z.string().min(1, "Nama wajib diisi"),
  kontak_stakeholder: z.string().min(1, "Kontak wajib diisi"),
  alamat_stakeholder: z.string().min(1, "Alamat wajib diisi"),
  kelurahan: z.string().min(1, "Kelurahan wajib diisi"),
  kecamatan: z.string().min(1, "Kecamatan wajib diisi"),

  skoring_power_stakeholder: z
    .number()
    .min(1, "Minimal 1")
    .max(100, "Maksimal 100"),

  skoring_interest_stakeholder: z
    .number()
    .min(1, "Minimal 1")
    .max(100, "Maksimal 100"),

  kegiatan_stakeholder: z.string().min(1, "Kegiatan wajib diisi"),
  tindak_lanjut_stakeholder: z.string().min(1, "Tindak lanjut wajib diisi"),

  kriteria_interest_stakeholder: z.enum(["kurang", "cukup", "baik"], {
    message: "Pilih salah satu",
  }),

  kategori_stakeholder: z.string().default("-"),
  strategi_stakeholder: z.string().default("-"),
  kriteria_influence_stakeholder: z.string().default("-"),
  kriteria_involvement_stakeholder: z.string().default("-"),
  keterikatan_stakeholder: z.string().default("-"),
});

export type StakeholderFormData = z.infer<typeof StakeholderSchema>;
export type StakeholderInput = z.input<typeof StakeholderSchema>;
