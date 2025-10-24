"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useTaskFlowStore } from "@/store";

export function TodaysActivity() {
  const { projects, tasks } = useTaskFlowStore();

  const today = new Date().toDateString();
  const todaysTasks = tasks.filter(
    (t) => new Date(t.createdAt).toDateString() === today
  );
  const totalProjects = projects.filter((p) => !p.archived).length;
  const completedToday = tasks.filter(
    (t) =>
      t.columnId === "done" &&
      new Date(t.updatedAt || t.createdAt).toDateString() === today
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="size-5" />
          Today&apos;s Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Tasks created today</span>
            <span className="font-medium">{todaysTasks.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Tasks completed</span>
            <span className="font-medium">{completedToday}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Active projects</span>
            <span className="font-medium">{totalProjects}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
