export type CrudActionKey = "read" | "update" | "delete" | "create" | string;

export type ActionsList = {
  [key in CrudActionKey]: {
    actions: CrudActionKey[]; // Permisos asociados a la acción
    /*  label?: string;
    icon?: React.ReactNode; // Agregar soporte para íconos
    style?: React.CSSProperties; // Agregar soporte para estilos personalizados
    callback?: (item?: any) => void; // Función personalizada para la acción */
  };
};

// Extender generateCrudActions
export type CrudActionConfig = {
  [key in CrudActionKey]: {
    permissions: CrudActionKey[];
    label?: string;
    icon?: React.ReactNode; // Agregar soporte para íconos
    style?: React.CSSProperties; // Agregar soporte para estilos personalizados
  };
};

/* export type CrudActionConfig = {
  [key in keyof ActionsList]: { permissions: CrudActionKey[]; label?: string };
};
 */
