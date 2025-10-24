"use client";

import { useState, useMemo } from "react";
import { useTaskFlowStore } from "@/store";
import { EditTaskModal } from "@/components/edit-task-modal";
import { Task } from "@/types";
import { TasksHeader } from "./tasks-header";
import { TasksFilters } from "./tasks-filters";
import { TasksEmptyState } from "./tasks-empty-state";
import { TasksGridView } from "./tasks-grid-view";
import { TasksListView } from "./tasks-list-view";
import { TasksKanbanView } from "./tasks-kanban-view";

type ViewMode = "grid" | "list" | "kanban";

export function Tasks() {
  const { tasks, deleteTask, addTask } = useTaskFlowStore();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    projectId: "",
    columnId: "",
  });

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject =
        projectFilter === "all" || task.projectId === projectFilter;

      const matchesStatus =
        statusFilter === "all" || task.columnId === statusFilter;

      return matchesSearch && matchesProject && matchesStatus;
    });
  }, [tasks, searchQuery, projectFilter, statusFilter]);

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newTaskData.title.trim() ||
      !newTaskData.projectId ||
      !newTaskData.columnId
    )
      return;

    addTask({
      projectId: newTaskData.projectId,
      title: newTaskData.title.trim(),
      columnId: newTaskData.columnId,
      description: newTaskData.description.trim() || undefined,
    });

    setNewTaskData({
      title: "",
      description: "",
      projectId: "",
      columnId: "",
    });
    setIsAddModalOpen(false);
  };

  const hasFilters =
    searchQuery.length > 0 || projectFilter !== "all" || statusFilter !== "all";

  return (
    <>
      <div className="space-y-6">
        <TasksHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isAddModalOpen={isAddModalOpen}
          onAddModalChange={setIsAddModalOpen}
          newTaskData={newTaskData}
          onNewTaskDataChange={setNewTaskData}
          onCreateTask={handleCreateTask}
        />

        <TasksFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          projectFilter={projectFilter}
          onProjectFilterChange={setProjectFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {filteredTasks.length === 0 ? (
          <TasksEmptyState hasFilters={hasFilters} />
        ) : (
          <>
            {viewMode === "grid" && (
              <TasksGridView
                tasks={filteredTasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            )}

            {viewMode === "list" && (
              <TasksListView
                tasks={filteredTasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            )}

            {viewMode === "kanban" && <TasksKanbanView />}
          </>
        )}
      </div>

      <EditTaskModal
        task={editingTask}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </>
  );
}
