import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

export function LogoutButton({ className }: { className?: string }) {
  const { logout } = useUser();
  return (
    <Button onClick={logout} variant={"ghost"} size={"icon-sm"}>
      <LogOut className={cn(`text-primary`, className)} />
    </Button>
  );
}
