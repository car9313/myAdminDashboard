export interface ActionDef<T> {
  label: string;
  action: (itemSelected: T) => void;
  key: string;
}
export interface ActionsDefProps<T> {
  itemSelected: T;
  actions?: ActionDef<T>[];
}
