import React from "react";
import type { Task } from "@/types";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="border rounded p-2 dark:bg-neutral-800 shadow-sm">
      <h5 className="font-medium">{task.title}</h5>
      {task.dueDate && (
        <span className="text-xs text-gray-400">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}
