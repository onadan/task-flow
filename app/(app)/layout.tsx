"use client";

import { AppSidebar } from "@/components/app-sidebar";
// import { Topbar } from "@/components/layouts/topbar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Loader = () => (
  <div className="flex flex-col gap-4 items-center justify-center h-screen w-full">
    <Spinner className="size-6" />

    <div className="flex gap-2 items-center">
      <Image
        width={16}
        height={16}
        src="/flow.svg"
        className="size-4!"
        alt="Taskflow Logo"
      />
      <span className="text-lg font-bold">taskflow</span>
    </div>
  </div>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useUser();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 flex flex-col mx-auto container">
            <header className="flex justify-between px-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
              </div>

              <div className="flex items-center gap-2">
                <ModeToggle />

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <LogoutButton />
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
