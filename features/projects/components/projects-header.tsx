"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProjectsHeaderProps {
  onNewProjectClick: () => void;
}

export function ProjectsHeader({ onNewProjectClick }: ProjectsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-1">
          Manage and organize your projects
        </p>
      </div>

      <Button onClick={onNewProjectClick}>
        <Plus className="size-4" />
        New Project
      </Button>
    </div>
  );
}
