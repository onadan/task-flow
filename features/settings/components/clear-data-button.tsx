"use client";

import { useTaskStore } from "@/features/tasks/store/task-store";

export function ClearDataButton() {
  const { tasks, projects } = useTaskStore();
  const clearAll = () => {
    localStorage.removeItem("taskflow-store");
    window.location.reload();
  };

  return (
    <button
      onClick={clearAll}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
    >
      Clear All Data ({tasks.length} tasks, {projects.length} projects)
    </button>
  );
}
