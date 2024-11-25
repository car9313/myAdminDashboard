import { Permission } from "@/interfaces/auth";
import { ColumnDef } from "@tanstack/react-table";
import { jwtDecode } from "jwt-decode";
// Función auxiliar para obtener propiedades de manera segura
export const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

// Función para formatear valores
export const formatValue = (value: any): string => {
  if (value instanceof Date) {
    return value.toLocaleDateString(); // Formateo de fechas
  }
  if (typeof value === "number") {
    return value.toLocaleString(); // Formateo de números
  }
  if (typeof value === "boolean") {
    return value ? "Sí" : "No"; // Formateo de booleanos
  }
  return String(value); // Formateo genérico
};
export const getDefCardViewKey = <T>(columnsDef: ColumnDef<T>[]) => {
  return columnsDef
    .filter((key) => key.id)
    .map((key) => {
      return {
        header: key.header as string,
        value: key.id as string,
      };
    });
};
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

//Extraer acciones de los permisos de un recurso específico
const getActionsForResource = (
  permissions: Permission[],
  resource: string
): string[] => {
  const permission = permissions.find((perm) => perm.resource === resource);
  return permission ? permission.actions : [];
};
