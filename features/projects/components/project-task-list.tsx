"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, User } from "lucide-react";
import { Task, Column } from "@/types";

interface ProjectTaskListProps {
  tasks: Task[];
  columns: Column[];
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export function ProjectTaskList({
  tasks,
  columns,
  onDeleteTask,
  onEditTask,
}: ProjectTaskListProps) {
  const getColumnName = (columnId: string) => {
    return columns.find((col) => col.id === columnId)?.name || "Unknown";
  };

  const getColumnColor = (columnId: string) => {
    const columnIndex = columns.findIndex((col) => col.id === columnId);
    // Simple color mapping based on column index
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-yellow-100 text-yellow-800",
      "bg-green-100 text-green-800",
      "bg-gray-100 text-gray-800",
    ];
    return colors[columnIndex] || "bg-gray-100 text-gray-800";
  };

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No tasks yet
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            Tasks added to this project will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="size-5" />
          Project Tasks ({tasks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onEditTask(task)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-sm truncate">{task.title}</h4>
                  <Badge className={`text-xs ${getColumnColor(task.columnId)}`}>
                    {getColumnName(task.columnId)}
                  </Badge>
                </div>
                {task.description && (
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {task.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  {task.assignedTo && (
                    <span className="flex items-center gap-1">
                      <User className="size-3" />
                      {task.assignedTo}
                    </span>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Are you sure you want to delete this task?")) {
                    onDeleteTask(task.id);
                  }
                }}
                className="ml-2"
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
