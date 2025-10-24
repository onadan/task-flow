"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTaskFlowStore } from "@/store";
import { useShallow } from "zustand/react/shallow";

export function Header() {
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useTaskFlowStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      isAuthenticated: !!state.currentUserId,
    }))
  );
  const isLoginPage = pathname === "/auth/login";

  return (
    <div className="h-16 border-b flex items-center  top-0 sticky z-40 backdrop-blur-md px-4">
      <div className="container mx-auto h-full flex justify-between items-center gap-4 ">
        <Link href={"/"}>
          <div className="flex gap-3 items-center">
            <Image
              src="/flow.svg"
              className="size-6"
              alt="taskflow app logo"
              width={24}
              height={24}
            />
            <p className="text-2xl  font-bold">taskflow</p>
          </div>
        </Link>

        {/* auth button */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          {!isLoading && isAuthenticated && (
            <Link href={"/dashboard"}>
              <Button size={"sm"}>Dashboard</Button>
            </Link>
          )}

          {!isLoading && !isAuthenticated && (
            <>
              {!isLoginPage && (
                <Link href={"/auth/login"}>
                  <Button size={"sm"}>Login</Button>
                </Link>
              )}

              {isLoginPage && (
                <Link href={"/auth/register"}>
                  <Button size={"sm"}>Get started</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
