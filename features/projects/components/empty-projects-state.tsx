"use client";

import { Button } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";

interface EmptyProjectsStateProps {
  onCreateProject: () => void;
}

export function EmptyProjectsState({
  onCreateProject,
}: EmptyProjectsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <FolderOpen className="size-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">No projects yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Get started by creating your first project. Projects help you organize
        tasks and collaborate with your team.
      </p>
      <Button onClick={onCreateProject}>
        <Plus className="size-4" />
        Create Your First Project
      </Button>
    </div>
  );
}
