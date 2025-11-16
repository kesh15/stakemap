import { z } from "zod";

export const ProjectSchema = z.object({
  nama_proyek: z.string().min(1, "Nama proyek wajib diisi"),
  alamat_proyek: z.string().min(1, "Alamat proyek wajib diisi"),
  koordinat: z.string().min(1, "Koordinat wajib diisi"),
  kategori_proyek: z.string().min(1, "Kategori proyek wajib diisi"),
  stakeholder_terlibat: z.array(z.uuid()),
  stakeholder_relations: z.array(
    z.object({
      from: z.uuid(),
      to: z.uuid(),
    })
  ),
  radius: z.number().min(1, "Radius wajib diisi"),
  tanggal_mulai: z.string().min(1, "Tanggal mulai wajib diisi"),
  tanggal_selesai: z.string().min(1, "Tanggal selesai wajib diisi"),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;
