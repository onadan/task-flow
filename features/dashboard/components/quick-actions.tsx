"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, FolderOpen, Target } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get you started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild className="w-full justify-start">
          <Link href="/projects">
            <FolderOpen className="size-4 mr-2" />
            Browse Projects
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/tasks">
            <Target className="size-4 mr-2" />
            Manage Tasks
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/settings">
            <CheckCircle className="size-4 mr-2" />
            Account Settings
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
