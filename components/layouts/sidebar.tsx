"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Folder, ClipboardList } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Folder },
  {
    name: "Tasks",
    href: "/tasks",
    icon: ClipboardList,
  },
  // { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-60 border-r p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-6">TaskFlow</h1>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-3 py-2 rounded-md transition-all",
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-neutral-600 hover:bg-neutral-100 font-medium hover:font-medium"
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="text-xs text-gray-400">© 2025 TaskFlow</div>
    </aside>
  );
}
