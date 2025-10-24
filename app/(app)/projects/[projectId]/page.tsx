"use client";

import { use } from "react";
import { ProjectDetails } from "@/features/projects/components";

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  return <ProjectDetails projectId={projectId} />;
}
