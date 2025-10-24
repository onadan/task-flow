"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Plus } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectHeaderProps {
  project: Project;
  onSettingsClick: () => void;
  onAddTaskClick: () => void;
}

export function ProjectHeader({
  project,
  onSettingsClick,
  onAddTaskClick,
}: ProjectHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Link href="/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div
            className="size-4 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          <h1 className="text-3xl font-bold">{project.name}</h1>
        </div>
        {project.description && (
          <p className="text-muted-foreground ml-12">{project.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onSettingsClick}>
          <Settings className="size-4 mr-2" />
          Settings
        </Button>
        <Button onClick={onAddTaskClick}>
          <Plus className="size-4 mr-2" />
          Add Task
        </Button>
      </div>
    </div>
  );
}
