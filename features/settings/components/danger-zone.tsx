"use client";

import { useState } from "react";
import { useTaskFlowStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export function DangerZone() {
  const router = useRouter();
  const { clearAllData, deleteAccount, logout } = useTaskFlowStore();
  const [isClearDataOpen, setIsClearDataOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  const handleClearAllData = () => {
    if (
      confirm(
        "Are you sure you want to clear all your data? This action cannot be undone."
      )
    ) {
      clearAllData();
      setIsClearDataOpen(false);
      alert("All your data has been cleared.");
    }
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data."
      )
    ) {
      deleteAccount();
      logout();
      router.push("/");
    }
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="size-5" />
          Danger Zone
        </CardTitle>
        <CardDescription>
          Irreversible actions that will affect your data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Clear All Data</h4>
            <p className="text-sm text-muted-foreground">
              Remove all your projects, tasks, and comments. Your account will
              remain.
            </p>
          </div>
          <Dialog open={isClearDataOpen} onOpenChange={setIsClearDataOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Clear Data</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear All Data</DialogTitle>
                <DialogDescription>
                  This will permanently delete all your projects, tasks, and
                  comments. Your account information will be preserved. This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsClearDataOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleClearAllData}>
                  Clear All Data
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium text-destructive">Delete Account</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <Dialog
            open={isDeleteAccountOpen}
            onOpenChange={setIsDeleteAccountOpen}
          >
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This will permanently delete your account and all associated
                  data including projects, tasks, and comments. This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteAccountOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
