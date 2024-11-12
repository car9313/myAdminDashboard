export interface Action<T> {
  label: string;
  action: (itemSelected: T) => void;
}
export interface DataActionsProps<T> {
  itemSelected: T;
  actions?: Action<T>[];
}
