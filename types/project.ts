import { StakeholderType } from "./stakeholder";

export interface ProjectType {
  id: string;
  nama_proyek: string;
  alamat_proyek: string;
  koordinat: string;
  kategori_proyek: string;
  stakeholder_terlibat: StakeholderType[];
  tanggal_mulai: string;
  tanggal_selesai: string;
}
