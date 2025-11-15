import { ProjectType } from "@/types/project";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProjectStore = {
  projects: ProjectType[];
  addProject: (item: ProjectType) => void;
  updateProject: (item: ProjectType) => void;
  removeProject: (id: string) => void;
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],

      addProject: (item) =>
        set((state) => ({
          projects: [...state.projects, item],
        })),

      updateProject: (updatedItem) =>
        set((state) => ({
          projects: state.projects.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((x) => x.id !== id),
        })),
    }),
    {
      name: "project-data", //localstorage key
    }
  )
);
