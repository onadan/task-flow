"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Target, Zap } from "lucide-react";
import Link from "next/link";
import { useTaskFlowStore } from "@/store";

export function RecentTasks() {
  const { projects, tasks } = useTaskFlowStore();

  const recentTasks = tasks
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="size-5" />
          Recent Tasks
        </CardTitle>
        <CardDescription>Your latest task activity</CardDescription>
      </CardHeader>
      <CardContent>
        {recentTasks.length === 0 ? (
          <div className="text-center py-6">
            <Target className="size-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No tasks yet</p>
            <Button asChild className="mt-4">
              <Link href="/tasks">Create your first task</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => {
              const project = projects.find((p) => p.id === task.projectId);
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {project && (
                        <Badge variant="secondary" className="text-xs">
                          {project.name}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.columnId === "done" ? (
                      <CheckCircle className="size-4 text-green-500" />
                    ) : task.columnId === "in-progress" ? (
                      <Clock className="size-4 text-blue-500" />
                    ) : (
                      <div className="size-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                </div>
              );
            })}
            <Button variant="outline" asChild className="w-full mt-4">
              <Link href="/tasks">View All Tasks</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
