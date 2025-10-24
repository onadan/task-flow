"use client";

import { Kanban } from "lucide-react";

export function TasksKanbanView() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Kanban className="size-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Kanban View</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Kanban view is coming soon! For now, you can view your tasks in grid or
        list format.
      </p>
    </div>
  );
}
