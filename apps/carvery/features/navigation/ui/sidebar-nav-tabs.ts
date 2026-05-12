export type NavigationTab = {
  label: string;
  path: string;
  sortIndex: number;
  value: string;
  icon: string;
};

export const navTabs: NavigationTab[] = [
  {
    label: "Home",
    path: routes.home,
    sortIndex: 1,
    value: "home",
    icon: "🏠",
  },
  {
    label: "Projects",
    path: routes.projects.root,
    sortIndex: 2,
    value: "projects",
    icon: "🪵",
  },
  {
    label: "Gallery",
    path: routes.gallery.root,
    sortIndex: 3,
    value: "gallery",
    icon: "🖼️",
  },
  {
    label: "Tools",
    path: routes.tools.root,
    sortIndex: 4,
    value: "tools",
    icon: "🔪",
  },
  {
    label: "About",
    path: routes.about.root,
    sortIndex: 5,
    value: "about",
    icon: "ℹ️",
  },
];