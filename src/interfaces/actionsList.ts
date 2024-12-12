/* export interface ActionsList {
  read: {
    actions: string[];
  };
  update: {
    actions: string[];
  };
  delete: {
    actions: string[];
  };
}
 */
export type CrudActionKey = "read" | "update" | "delete";

export type ActionsList = {
  [key in CrudActionKey]: {
    actions: string[]; // Permisos asociados a la acción
  };
};
