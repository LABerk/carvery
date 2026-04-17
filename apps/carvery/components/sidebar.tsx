"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-56 min-h-screen bg-surface border-r border-border px-4 py-8 gap-1">
      <div className="mb-8 px-2">
        <span className="text-xl font-bold text-foreground tracking-tight">🪵 Carvery</span>
      </div>
      <nav className="flex flex-col gap-1">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-fg"
                  : "text-subtle hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{route.icon}</span>
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
