"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3X3, List, Kanban, Plus } from "lucide-react";
import { useTaskFlowStore } from "@/store";

type ViewMode = "grid" | "list" | "kanban";

interface TasksHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isAddModalOpen: boolean;
  onAddModalChange: (open: boolean) => void;
  newTaskData: {
    title: string;
    description: string;
    projectId: string;
    columnId: string;
  };
  onNewTaskDataChange: (data: {
    title: string;
    description: string;
    projectId: string;
    columnId: string;
  }) => void;
  onCreateTask: (e: React.FormEvent) => void;
}

export function TasksHeader({
  viewMode,
  onViewModeChange,
  isAddModalOpen,
  onAddModalChange,
  newTaskData,
  onNewTaskDataChange,
  onCreateTask,
}: TasksHeaderProps) {
  const { projects, columns } = useTaskFlowStore();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">
          Manage and track all your tasks across projects
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Dialog open={isAddModalOpen} onOpenChange={onAddModalChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={onCreateTask}>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to organize your work.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input
                    id="task-title"
                    placeholder="Enter task title"
                    value={newTaskData.title}
                    onChange={(e) =>
                      onNewTaskDataChange({
                        ...newTaskData,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea
                    id="task-description"
                    placeholder="Enter task description (optional)"
                    value={newTaskData.description}
                    onChange={(e) =>
                      onNewTaskDataChange({
                        ...newTaskData,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task-project">Project</Label>
                  <Select
                    value={newTaskData.projectId}
                    onValueChange={(value) =>
                      onNewTaskDataChange({
                        ...newTaskData,
                        projectId: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task-status">Status</Label>
                  <Select
                    value={newTaskData.columnId}
                    onValueChange={(value) =>
                      onNewTaskDataChange({
                        ...newTaskData,
                        columnId: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column.id} value={column.id}>
                          {column.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onAddModalChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("grid")}
        >
          <Grid3X3 className="size-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("list")}
        >
          <List className="size-4" />
        </Button>
        <Button
          variant={viewMode === "kanban" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("kanban")}
          disabled
        >
          <Kanban className="size-4" />
        </Button>
      </div>
    </div>
  );
}
