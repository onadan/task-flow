"use client";

import { useTaskFlowStore } from "@/store";
import { Separator } from "@/components/ui/separator";
import {
  SettingsHeader,
  AccountInformation,
  DangerZone,
} from "@/features/settings";

export default function SettingsPage() {
  const { getCurrentUser } = useTaskFlowStore();
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-2">Not logged in</h2>
        <p className="text-muted-foreground">
          Please log in to access settings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SettingsHeader />
      <AccountInformation />
      <Separator />
      <DangerZone />
    </div>
  );
}
