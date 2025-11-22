'use client';

import { StakeholderType } from '@/types/stakeholder';
import { create } from 'zustand';
import axios from 'axios';

type StakeholderStore = {
  stakeholders: StakeholderType[];
  fetchStakeholders: () => Promise<void>;
  addStakeholder: (item: StakeholderType) => Promise<void>;
  updateStakeholder: (item: StakeholderType) => Promise<void>;
  removeStakeholder: (id: string) => Promise<void>;
};

const API_URL = 'http://localhost:3001/stakeholders';

export const useStakeholderStore = create<StakeholderStore>((set) => ({
  stakeholders: [],

  fetchStakeholders: async () => {
    const response = await axios.get(API_URL);
    set({ stakeholders: response.data });
  },

  addStakeholder: async (item) => {
    const response = await axios.post(API_URL, item);
    set((state) => ({
      stakeholders: [...state.stakeholders, response.data],
    }));
  },

  updateStakeholder: async (updatedItem) => {
    await axios.put(`${API_URL}/${updatedItem.id}`, updatedItem);
    set((state) => ({
      stakeholders: state.stakeholders.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    }));
  },

  removeStakeholder: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    set((state) => ({
      stakeholders: state.stakeholders.filter((x) => x.id !== id),
    }));
  },
}));
