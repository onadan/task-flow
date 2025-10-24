"use client";

import { KanbanColumn } from "./kanban-column";
import { Column, Task } from "@/types";

interface KanbanBoardProps {
  columns: Column[];
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

export function KanbanBoard({
  columns,
  tasks,
  onDeleteTask,
}: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnTasks = tasks
          .filter((t) => t.columnId === column.id)
          .sort((a, b) => a.position - b.position);

        return (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
            onDeleteTask={onDeleteTask}
          />
        );
      })}
    </div>
  );
}
