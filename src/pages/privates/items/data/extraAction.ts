import { ActionDef } from "@/interfaces/actionDef";
import { Item } from "../models/item";
import { itemActionsList } from "@/data/itemCrudActionsList";

export const extraActions: ActionDef<Item>[] = [
  {
    id: "prueba1",
    label: "Ver Detalles",
    action: ({ item }) => alert(item),
    permissions: itemActionsList.read.actions,
  },

  {
    id: "prueba2",
    label: "Eliminar",
    action: ({ item }) => alert(item?.name),
    permissions: itemActionsList.delete.actions,
  },
];
