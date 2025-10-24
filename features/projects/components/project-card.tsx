"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Archive, Trash2 } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  taskCount: number;
  onArchive: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectCard({
  project,
  taskCount,
  onArchive,
  onDelete,
}: ProjectCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      onDelete(project.id);
    }
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    onArchive(project.id);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <Link href={`/projects/${project.id}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="size-3 rounded-full shrink-0"
                style={{ backgroundColor: project.color }}
              />
              <CardTitle className="truncate">{project.name}</CardTitle>
            </div>
            <div
              className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.preventDefault()}
            >
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={handleArchive}
                title="Archive project"
              >
                <Archive className="size-4" />
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={handleDelete}
                title="Delete project"
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </div>
          <CardDescription className="line-clamp-2">
            {project.description || "No description provided"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {taskCount} {taskCount === 1 ? "task" : "tasks"}
            </span>
            <span>
              Created {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
