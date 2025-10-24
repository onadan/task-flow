"use client";

import { useState } from "react";
import { useTaskFlowStore } from "@/store";
import {
  ProjectsHeader,
  AddProjectModal,
  EmptyProjectsState,
  ProjectsGrid,
} from "@/features/projects/components";

export default function ProjectsPage() {
  const { projects, tasks, archiveProject, deleteProject } = useTaskFlowStore();

  const [open, setOpen] = useState(false);

  const activeProjects = projects.filter((p) => !p.archived);

  const getProjectTaskCount = (projectId: string) => {
    return tasks.filter((t) => t.projectId === projectId).length;
  };

  return (
    <div className="p-6">
      <ProjectsHeader onNewProjectClick={() => setOpen(true)} />
      <AddProjectModal open={open} onOpenChange={setOpen} />

      {activeProjects.length === 0 ? (
        <EmptyProjectsState onCreateProject={() => setOpen(true)} />
      ) : (
        <ProjectsGrid
          projects={activeProjects}
          getProjectTaskCount={getProjectTaskCount}
          onArchiveProject={archiveProject}
          onDeleteProject={deleteProject}
        />
      )}
    </div>
  );
}
