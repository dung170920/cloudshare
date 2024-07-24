import { IconName } from "@/types/icon-types";

export const path = {
  home: "/",
  dashboard: "/dashboard",
  files: "/dashboard/files",
};

export const navLinks: { icon: IconName; activeIcon: IconName; title: string; path: string }[] = [
  {
    icon: "home",
    activeIcon: "solid-home",
    title: "Dashboard",
    path: path.dashboard,
  },
  {
    icon: "file-text",
    activeIcon: "solid-file-text",
    title: "Files",
    path: path.files,
  },
];
