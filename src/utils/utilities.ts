import { Permission } from "@/interfaces/auth";
import { ColumnDef } from "@tanstack/react-table";
import { jwtDecode, JwtPayload } from "jwt-decode";
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

//Extraer acciones de los permisos de un recurso específico
const getActionsForResource = (
  permissions: Permission[],
  resource: string
): string[] => {
  const permission = permissions.find((perm) => perm.resource === resource);
  return permission ? permission.actions : [];
};
