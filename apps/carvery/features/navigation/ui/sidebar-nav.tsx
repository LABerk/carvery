"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/features/theme/ui/theme-toggle";
import { sidebarNavTabs as navTabs } from "./sidebar-nav-tabs";

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-56 min-h-screen bg-surface border-r border-border px-4 py-8 gap-1 shrink-0">
      <div className="mb-8 px-2">
        <span className="text-xl font-bold text-foreground tracking-tight">🪵 Carvery</span>
      </div>
      <nav className="flex flex-col gap-1">
        {navTabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.value}
              href={tab.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-fg"
                  : "text-subtle hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 border-t border-border">
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default SidebarNav;