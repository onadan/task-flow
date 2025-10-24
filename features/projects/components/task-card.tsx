"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  return (
    <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
      <h4 className="font-medium text-sm">{task.title}</h4>
      {task.description && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <Button size="sm" variant="ghost" onClick={handleDelete}>
          <Trash2 className="size-3 text-destructive" />
        </Button>
      </div>
    </Card>
  );
}
