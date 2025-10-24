import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  projectId?: string;
}

export interface Project {
  id: string;
  name: string;
}

interface TaskState {
  tasks: Task[];
  projects: Project[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
  addProject: (name: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: nanoid() }],
        })),

      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updatedTask } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      toggleStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status:
                    t.status === "todo"
                      ? "in-progress"
                      : t.status === "in-progress"
                      ? "done"
                      : "todo",
                }
              : t
          ),
        })),

      addProject: (name) =>
        set((state) => ({
          projects: [...state.projects, { id: nanoid(), name }],
        })),
    }),
    { name: "taskflow-store" }
  )
);
