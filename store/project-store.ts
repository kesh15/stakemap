import { ProjectType } from '@/types/project';
import axios from 'axios';
import { create } from 'zustand';

type ProjectStore = {
  projects: ProjectType[];
  addProject: (item: ProjectType) => void;
  updateProject: (item: ProjectType) => void;
  removeProject: (id: string) => void;
  fetchProjects: () => Promise<void>;
};

const API_URL = 'http://localhost:3001/projects';

export const useProjectStore = create<ProjectStore>()((set) => ({
  projects: [],

  fetchProjects: async () => {
    const response = await axios.get(API_URL);
    set({ projects: response.data });
  },

  addProject: async (item) => {
    const response = await axios.post(API_URL, item);
    set((state) => ({
      projects: [...state.projects, response.data],
    }));
  },

  updateProject: async (updatedItem) => {
    await axios.put(`${API_URL}/${updatedItem.id}`, updatedItem);
    set((state) => ({
      projects: state.projects.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    }));
  },

  removeProject: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    set((state) => ({
      projects: state.projects.filter((x) => x.id !== id),
    }));
  },
}));
