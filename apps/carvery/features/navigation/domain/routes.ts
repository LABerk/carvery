import { DynamicRoute } from "@/aspects/routing/dynamic-route";

export interface EditProjectPagePathParams {
  projectId: string;
}

export interface ViewProjectPagePathParams {
  projectId: string;
}

export const routes = {
  home: "/",
  projects: {
    root: "/projects",
    view: new DynamicRoute<ViewProjectPagePathParams>("/projects/{projectId}"),
    edit: new DynamicRoute<EditProjectPagePathParams>("/projects/{projectId}/edit"),
  },
  gallery: {
    root: "/gallery",
  },
  tools: {
    root: "/tools",
  },
  about: {
    root: "/about",
  },
  kop: {
    root: "/kop",
  },
  lab: {
    root: "/lab",
  },
} as const;

