import { Item } from "@/pages/items/models/item";

export interface Action<T> {
  label: string;
  action: (itemSelected: T) => void;
}
export interface DataActionsProps<T> {
  itemSelected: T;
  actions?: Action<T>[];
}
