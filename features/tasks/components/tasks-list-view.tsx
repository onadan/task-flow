"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useTaskFlowStore } from "@/store";
import { Task } from "@/types";

interface TasksListViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TasksListView({
  tasks,
  onEditTask,
  onDeleteTask,
}: TasksListViewProps) {
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
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onEditTask(task)}
            >
              <TableCell>
                <div>
                  <div className="font-medium">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {task.description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className="size-2 rounded-full"
                    style={{
                      backgroundColor: getProjectColor(task.projectId),
                    }}
                  />
                  <span className="text-sm">
                    {getProjectName(task.projectId)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`text-xs ${getStatusColor(
                    task.columnId
                  )} text-white`}
                >
                  {getColumnName(task.columnId)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task.id);
                  }}
                >
                  <Trash2 className="size-3 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
