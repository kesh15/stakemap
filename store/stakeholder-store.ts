"use client";

import { StakeholderType } from "@/types/stakeholder";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type StakeholderStore = {
  stakeholders: StakeholderType[];
  addStakeholder: (item: StakeholderType) => void;
  updateStakeholder: (item: StakeholderType) => void;
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
    }),
    {
      name: "stakeholder-data", // localStorage key
    }
  )
);
