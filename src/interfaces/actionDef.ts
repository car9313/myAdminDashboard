import { ModalMode } from "./modalMode";

export interface ActionDef<T> {
  id: string;
  label: string;
  action: ({ mode, item }: { mode?: ModalMode; item?: T }) => void;
  icon?: React.ReactNode; // Agregar soporte para íconos
  style?: React.CSSProperties; // Agregar soporte para estilos personalizados
  permissions: string[];
}
export interface ActionsDefProps<T> {
  itemSelected: T;
  actions?: ActionDef<T>[];
}
