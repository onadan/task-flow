"use client";

import { Search } from "lucide-react";

interface TasksEmptyStateProps {
  hasFilters: boolean;
}

export function TasksEmptyState({ hasFilters }: TasksEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Search className="size-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">No tasks found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {hasFilters
          ? "Try adjusting your filters or search query."
          : "Get started by creating your first task in a project."}
      </p>
    </div>
  );
}
