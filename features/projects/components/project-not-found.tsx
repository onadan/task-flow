"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold mb-2">Project not found</h2>
      <p className="text-muted-foreground mb-4">
        The project you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/projects">
        <Button>
          <ArrowLeft className="size-4 mr-2" />
          Back to Projects
        </Button>
      </Link>
    </div>
  );
}
