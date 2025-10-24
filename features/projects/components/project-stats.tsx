"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectMember, Task, Column } from "@/types";

interface ProjectStatsProps {
  tasks: Task[];
  members: ProjectMember[];
  columns: Column[];
}

export function ProjectStats({ tasks, members, columns }: ProjectStatsProps) {
  const completedTasks = tasks.filter(
    (t) => t.columnId === columns[3]?.id
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasks.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{members.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks}</div>
        </CardContent>
      </Card>
    </div>
  );
}
