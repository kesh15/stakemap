"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StakeholderType = {
  id: string;
  nama_stakeholder: string;
  kontak_stakeholder: string;
  alamat_stakeholder: string;
  kelurahan: string;
  kecamatan: string;
  skoring_power_stakeholder: number;
  skoring_interest_stakeholder: number;
  kategori_stakeholder: string;
  strategi_stakeholder: string;
  kegiatan_stakeholder: string;
  tindak_lanjut_stakeholder: string;
  kriteria_interest_stakeholder: string;
  kriteria_influence_stakeholder: string;
  kriteria_involvement_stakeholder: string;
  keterikatan_stakeholder: string;
};

type StakeholderStore = {
  stakeholders: StakeholderType[];
  addStakeholder: (item: StakeholderType) => void;
  removeStakeholder: (id: string) => void;
};

export const useStakeholderStore = create<StakeholderStore>()(
  persist(
    (set) => ({
      stakeholders: [],

      addStakeholder: (item) =>
        set((state) => ({
          stakeholders: [...state.stakeholders, item],
        })),

      removeStakeholder: (id) =>
        set((state) => ({
          stakeholders: state.stakeholders.filter((x) => x.id !== id),
        })),
    }),

    {
      name: "stakeholder-data", // localStorage key
    }
  )
);
