export type Route = {
  label: string;
  href: string;
  icon: string;
};

export const routes: Route[] = [
  { label: "Home",      href: "/",         icon: "🏠" },
  { label: "Projects",  href: "/projects",  icon: "🪵" },
  { label: "Gallery",   href: "/gallery",   icon: "🖼️" },
  { label: "Tools",     href: "/tools",     icon: "🔪" },
  { label: "About",     href: "/about",     icon: "ℹ️"  },
];
