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
  updateStakeholder: (item: StakeholderType) => void;
  removeStakeholder: (id: string) => void;

  // Modal control
  modalOpen: boolean;
  modalMode: "create" | "edit" | "read";
  selectedStakeholder: StakeholderType | null;

  setModal: (
    open: boolean,
    mode?: "create" | "edit" | "read",
    data?: StakeholderType | null
  ) => void;
};

export const useStakeholderStore = create<StakeholderStore>()(
  persist(
    (set) => ({
      stakeholders: [],

      addStakeholder: (item) =>
        set((state) => ({
          stakeholders: [...state.stakeholders, item],
        })),

      updateStakeholder: (updatedItem) =>
        set((state) => ({
          stakeholders: state.stakeholders.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        })),

      removeStakeholder: (id) =>
        set((state) => ({
          stakeholders: state.stakeholders.filter((x) => x.id !== id),
        })),

      // Modal default state
      modalOpen: false,
      modalMode: "create",
      selectedStakeholder: null,
      setModal: (open, mode = "create", data = null) =>
        set({ modalOpen: open, modalMode: mode, selectedStakeholder: data }),
    }),

    {
      name: "stakeholder-data", // localStorage key
    }
  )
);
