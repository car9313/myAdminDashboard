import {
  IconBoxSeam,
  IconChecklist,
  IconLayoutDashboard,
  IconRouteAltLeft,
  IconSettings,
  IconTruck,
} from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
  resource: string;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/",
    icon: <IconLayoutDashboard size={18} />,
    resource: "Audit", // Recurso asociado en los permisos
  },
  {
    title: "Items",
    label: "",
    href: "/items",
    icon: <IconChecklist size={18} />,
    resource: "Item",
  },
  {
    title: "ItemsSPA",
    label: "",
    href: "/itemsSPA",
    icon: <IconChecklist size={18} />,
    resource: "ItemsSPA",
  },
  {
    title: "ItemsSPA",
    label: "",
    href: "/itemsSPA",
    icon: <IconChecklist size={18} />,
    resource: "ItemSPA",
  },
  {
    title: "Requests",
    label: "10",
    href: "/requests",
    icon: <IconRouteAltLeft size={18} />,
    resource: "Requests",
    sub: [
      {
        title: "Trucks",
        label: "9",
        href: "/trucks",
        icon: <IconTruck size={18} />,
        resource: "Trucks",
      },
      {
        title: "Cargos",
        label: "",
        href: "/cargos",
        icon: <IconBoxSeam size={18} />,
        resource: "Cargos",
      },
    ],
  },
  {
    title: "Settings",
    label: "",
    href: "/settings",
    icon: <IconSettings size={18} />,
    resource: "Settings",
  },
];
