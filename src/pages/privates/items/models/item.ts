import { Item } from "@radix-ui/react-dropdown-menu";

export interface Item {
  id: string;
  name: string;
  description: string;
}

export type Model = typeof Item;
