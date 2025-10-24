"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useTaskFlowStore } from "@/store";
import { Task } from "@/types";

interface TasksGridViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TasksGridView({
  tasks,
  onEditTask,
  onDeleteTask,
}: TasksGridViewProps) {
  const { projects, columns } = useTaskFlowStore();

  const getProjectName = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.name || "Unknown Project";
  };

  const getProjectColor = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.color || "#gray";
  };

  const getColumnName = (columnId: string) => {
    const column = columns.find((c) => c.id === columnId);
    return column?.name || "Unknown Status";
  };

  const getStatusColor = (columnId: string) => {
    const columnIndex = columns.findIndex((c) => c.id === columnId);
    const colors = [
      "bg-blue-500",
      "bg-yellow-500",
      "bg-orange-500",
      "bg-green-500",
    ];
    return colors[columnIndex] || "bg-gray-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onEditTask(task)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-sm font-medium line-clamp-2">
                {task.title}
              </CardTitle>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="size-3 text-destructive" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="size-2 rounded-full"
                style={{
                  backgroundColor: getProjectColor(task.projectId),
                }}
              />
              <span className="text-xs text-muted-foreground">
                {getProjectName(task.projectId)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {task.description && (
              <CardDescription className="text-xs line-clamp-3 mb-3">
                {task.description}
              </CardDescription>
            )}
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className={`text-xs ${getStatusColor(
                  task.columnId
                )} text-white`}
              >
                {getColumnName(task.columnId)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
