"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "./task-card";
import { Column, Task } from "@/types";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

export function KanbanColumn({
  column,
  tasks,
  onDeleteTask,
}: KanbanColumnProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {column.name}
          <Badge variant="secondary">{tasks.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No tasks
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
