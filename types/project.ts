import { StakeholderType } from "./stakeholder";

export interface ProjectType {
  id: string;
  nama_proyek: string;
  alamat_proyek: string;
  koordinat: string;
  radius: number;
  kategori_proyek: string;
  stakeholder_terlibat: StakeholderType[];
  stakeholder_relations: StakeholderRelation[];
  tanggal_mulai: string;
  tanggal_selesai: string;
}

export interface StakeholderRelation {
  from: string; // stakeholder.id
  to: string; // stakeholder.id
}