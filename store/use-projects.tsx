// store/useProjects.ts
import { create } from "zustand";
import { nanoid } from "nanoid";

type Task = {
  id: string;
  projectId: string;
  title: string;
  status: "todo" | "in-progress" | "done";
};

type Project = {
  id: string;
  name: string;
  description?: string;
};

type State = {
  projects: Project[];
  tasks: Task[];
  addTask: (projectId: string, title: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
};

export const useProjects = create<State>((set) => ({
  projects: [],
  tasks: [],
  addTask: (projectId, title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: nanoid(), projectId, title, status: "todo" },
      ],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
}));
