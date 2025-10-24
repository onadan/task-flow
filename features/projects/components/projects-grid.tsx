"use client";

import { ProjectCard } from "./project-card";
import { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
  getProjectTaskCount: (projectId: string) => number;
  onArchiveProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectsGrid({
  projects,
  getProjectTaskCount,
  onArchiveProject,
  onDeleteProject,
}: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => {
        const taskCount = getProjectTaskCount(project.id);

        return (
          <ProjectCard
            key={project.id}
            project={project}
            taskCount={taskCount}
            onArchive={onArchiveProject}
            onDelete={onDeleteProject}
          />
        );
      })}
    </div>
  );
}
