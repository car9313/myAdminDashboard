import { ActionDef } from "@/interfaces/actionDef";
import { Permission } from "@/interfaces/auth";
import { ModalMode } from "@/interfaces/modalMode";
import { ColumnDef } from "@tanstack/react-table";

export const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

export const formatValue = (value: any): string => {
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === "number") return value.toLocaleString();
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return String(value);
};

export const getDefCardViewKey = <T>(columnsDef: ColumnDef<T>[]) => {
  const prueba = columnsDef
    .filter((key) => key.id)
    .map((key) => {
      return {
        id: key.id as string,
        title: key.meta as string,
        enableSorting: key.enableSorting as boolean,
      };
    });
  return prueba;
};
export const isTokenExpired = (token: string): boolean => {
  /* try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return !!decoded.exp && decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return true; // Si no se puede decodificar, se asume que el token no es válido
  } */
  return false;
};
/**
 * Extrae las acciones de los permisos para un recurso específico.
 * @param {Permission[]} permissions - Lista de permisos disponibles.
 * @param {string} resource - Recurso para el que se buscan las acciones.
 * @returns {string[]} - Lista de acciones asociadas al recurso.
 */
export const getActionsForResource = (
  permissions: Permission[],
  resource: string
): string[] => {
  const permission = permissions.find((perm) => perm.resource === resource);
  return permission ? permission.actions : [];
};

/**
 * Crea una definición de acción si se cumple una condición.
 * @template T
 * @param {string} label - Etiqueta descriptiva de la acción.
 * @param {(row: T) => void} action - Función que define la acción.
 * @param {boolean} condition - Condición para incluir la acción.
 * @param {string} key - Identificador único de la acción.
 * @returns {ActionDef<T> | null} - Objeto de acción si la condición es verdadera, de lo contrario, `null`.
 */ /* 
export const createAction = <T>(
  id: string,
  label: string,
  action: ({ mode, item }: { mode?: ModalMode; item?: T }) => void,
  condition: boolean
): ActionDef<T> | null => {
  return condition
    ? {
        id,
        label,
        action,
      }
    : null;
}; */
