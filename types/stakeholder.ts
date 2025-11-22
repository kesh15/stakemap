export interface StakeholderType {
  id: string;
  kategori_stakeholder: string | undefined;
  strategi_stakeholder: string | undefined;
  kriteria_interest_stakeholder: KriteriaInterestStakeholderEnum | undefined;
  kriteria_influence_stakeholder: string | undefined;
  kriteria_involvement_stakeholder: string | undefined;
  keterikatan_stakeholder: string | undefined;
  nama_stakeholder: string;
  kontak_stakeholder: string;
  alamat_stakeholder: string;
  kelurahan: string;
  kecamatan: string;
  skoring_power_stakeholder: number;
  skoring_interest_stakeholder: number;
  kegiatan_stakeholder: string;
  tindak_lanjut_stakeholder: string;
}

export enum KriteriaInterestStakeholderEnum {
  KURANG = "kurang",
  CUKUP = "cukup",
  BAIK = "baik",
}
