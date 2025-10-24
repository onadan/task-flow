"use client";

import { ModeToggle } from "../mode-toggle";

export function Topbar() {
  return (
    <header className="h-14 border-b  flex items-center justify-between px-4">
      {/* <input
        type="text"
        placeholder="Search tasks..."
        className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      /> */}

      <div></div>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-semibold text-primary">
            D
          </div>
        </div>
      </div>
    </header>
  );
}
