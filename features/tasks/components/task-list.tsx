"use client";

import { useTaskStore } from "../store/task-store";
import TaskCard from "./task-card";

export function TaskList() {
  const { tasks } = useTaskStore();

  const grouped = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(grouped).map(([status, items]) => (
        <div key={status}>
          <h3 className="text-lg font-semibold mb-3 capitalize">
            {status.replace("-", " ")}
          </h3>
          <div className="space-y-3">
            {items.length ? (
              items.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className="text-gray-400 text-sm">No tasks</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
