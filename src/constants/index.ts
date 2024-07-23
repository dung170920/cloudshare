export const path = {
  home: "/",
  dashboard: "/dashboard",
  files: "/dashboard/files",
};

export const navLinks: { icon: string; title: string; path: string }[] = [
  {
    icon: "home",
    title: "Dashboard",
    path: path.dashboard,
  },
  {
    icon: "file-text",
    title: "Files",
    path: path.files,
  },
];
