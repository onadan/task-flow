"use client";

import { TaskList } from "@/features/tasks/components/task-list";
import { useTaskStore } from "@/features/tasks/store/task-store";
import { Trash2, Folder } from "lucide-react";
import { useState } from "react";

export function ProjectList() {
  const { projects, tasks, deleteTask } = useTaskStore();
  const [selected, setSelected] = useState<string | null>(null);

  const filteredTasks = selected
    ? tasks.filter((t) => t.projectId === selected)
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Projects Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Projects</h3>
        <div className="space-y-3">
          {projects.length ? (
            projects.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`border p-4 rounded-lg cursor-pointer flex justify-between items-center transition ${
                  selected === p.id
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className="text-primary" size={18} />
                  <span className="font-medium">{p.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // delete all tasks under project
                    tasks
                      .filter((t) => t.projectId === p.id)
                      .forEach((t) => deleteTask(t.id));
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Delete project tasks"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No projects yet</p>
          )}
        </div>
      </div>

      {/* Project Tasks Section */}
      <div>
        {selected ? (
          <>
            <h3 className="text-lg font-semibold mb-3">
              Tasks in &quot;{projects.find((p) => p.id === selected)?.name}
              &quot;
            </h3>
            {filteredTasks.length ? (
              <TaskList />
            ) : (
              <p className="text-gray-400 text-sm">No tasks in this project</p>
            )}
          </>
        ) : (
          <p className="text-gray-500 mt-8">Select a project to view tasks.</p>
        )}
      </div>
    </div>
  );
}
