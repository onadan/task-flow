"use client";

import { useState } from "react";
import { useTaskFlowStore } from "@/store";
import { useRouter } from "next/navigation";
import { EditTaskModal } from "@/components/edit-task-modal";
import { Task } from "@/types";
import {
  ProjectHeader,
  AddTaskModal,
  ProjectStats,
  ProjectTaskList,
  EditProjectModal,
  ProjectNotFound,
} from "@/features/projects/components";

interface ProjectDetailsProps {
  projectId: string;
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const router = useRouter();

  const {
    projects,
    tasks,
    columns,
    projectMembers,
    addTask,
    deleteTask,
    updateProject,
    archiveProject,
    deleteProject,
  } = useTaskFlowStore();

  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const members = projectMembers.filter((m) => m.projectId === projectId);

  if (!project) {
    return <ProjectNotFound />;
  }

  const handleAddTask = (taskData: {
    title: string;
    description: string;
    columnId: string;
  }) => {
    addTask({
      projectId,
      ...taskData,
    });
  };

  const handleEditProject = (updates: {
    name: string;
    description: string;
    color: string;
  }) => {
    updateProject(projectId, updates);
  };

  const handleArchive = () => {
    if (confirm("Are you sure you want to archive this project?")) {
      archiveProject(projectId);
      router.push("/projects");
    }
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone and will delete all tasks and comments."
      )
    ) {
      deleteProject(projectId);
      router.push("/projects");
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditTaskModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <ProjectHeader
        project={project}
        onSettingsClick={() => setEditProjectOpen(true)}
        onAddTaskClick={() => setAddTaskOpen(true)}
      />

      <AddTaskModal
        open={addTaskOpen}
        onOpenChange={setAddTaskOpen}
        columns={columns}
        onAddTask={handleAddTask}
      />

      <ProjectStats tasks={projectTasks} members={members} columns={columns} />

      <ProjectTaskList
        tasks={projectTasks}
        columns={columns}
        onDeleteTask={deleteTask}
        onEditTask={handleEditTask}
      />

      <EditProjectModal
        open={editProjectOpen}
        onOpenChange={setEditProjectOpen}
        project={project}
        onSave={handleEditProject}
        onArchive={handleArchive}
        onDelete={handleDelete}
      />

      <EditTaskModal
        task={editingTask}
        open={isEditTaskModalOpen}
        onOpenChange={setIsEditTaskModalOpen}
      />
    </div>
  );
}
