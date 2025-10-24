"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useTaskFlowStore } from "@/store";

export function WelcomeHeader() {
  const { getCurrentUser } = useTaskFlowStore();
  const currentUser = getCurrentUser();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {currentUser?.name || "User"}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/tasks">
            <Plus className="size-4 mr-2" />
            New Task
          </Link>
        </Button>
      </div>
    </div>
  );
}
