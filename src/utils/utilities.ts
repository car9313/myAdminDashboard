import { NavLink, SideLink } from "@/data/sidelinks";
import { ActionDef } from "@/interfaces/actionDef";
import { Permission, Role, User } from "@/interfaces/auth";
import { ColumnDef } from "@tanstack/react-table";
import { RouteObject } from "react-router-dom";
/* import { jwtDecode, JwtPayload } from "jwt-decode"; */
// import { checkPermissions } from '@/utils/utilities';
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
      console.log(key);
      return {
        id: key.id as string,
        header: key.header as string,
        value: key.id as string,
      };
    });
};
export const isTokenExpired = (token: string): boolean => {
  console.log(token);
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
export const getActionsForResource = (
  permissions: Permission[],
  resource: string
): string[] => {
  const permission = permissions.find((perm) => perm.resource === resource);
  return permission ? permission.actions : [];
};

export const createAction = <T>(
  label: string,
  action: (row: T) => void,
  condition: boolean,
  key: string
): ActionDef<T> | null => {
  return condition
    ? {
        label,
        action,
        key, // Identificador único
      }
    : null;
};
export const getGrantedActions = (
  roles: Role[],
  resource: string
): Set<string> => {
  const granted = new Set<string>();

  roles.forEach((role) => {
    role.permissions.forEach((perm) => {
      if (perm.resource === resource) {
        console.log(perm.resource);
        console.log(resource);
        console.log(perm.actions);
        perm.actions.forEach((action) => {
          console.log(action);
          return granted.add(action);
        });
      }
    });
  });

  return granted;
};
/*
La función checkPermissions evalúa si un usuario (a través de sus roles) tiene permisos específicos para un recurso, y devuelve un resumen de:
Si tiene todos los permisos solicitados (hasAll).
Qué permisos están faltando (missing).
Qué permisos fueron otorgados (granted). 
*/
interface CheckPermissionsProps {
  user: User | undefined;
  resource: string;
  actions: string[];
}
export const checkPermissions = ({
  user,
  resource,
  actions,
}: CheckPermissionsProps): {
  hasAll: boolean;
  missing: string[];
  granted: Set<string>;
} => {
  if (!user || !user?.roles || user.roles.length === 0) {
    return { hasAll: false, missing: actions, granted: new Set() };
  }

  const roles = user?.roles;
  const granted = getGrantedActions(roles, resource);

  // Filtrar las acciones faltantes
  const missing = actions.filter((action) => !granted.has(action));

  return {
    hasAll: missing.length === 0,
    missing,
    granted, // Devolver un Set directamente
  };
};
export function mapUserPermissions(user: User): Record<string, string[]> {
  // Si el usuario no está definido o no tiene roles, retornamos un objeto vacío
  if (!user.roles || user.roles.length === 0) {
    return {}; // Retorna un objeto vacío si no hay roles
  }

  const permissions: Record<string, string[]> = {};

  // Iteramos sobre los roles del usuario
  user.roles.forEach((role: Role) => {
    role.permissions.forEach((permission: Permission) => {
      const { resource, actions } = permission;

      // Aseguramos que las acciones no se repitan por recurso
      if (!permissions[resource]) {
        permissions[resource] = [];
      }
      permissions[resource] = [
        ...new Set([...permissions[resource], ...actions]),
      ];
    });
  });

  return permissions;
}

/* export function filterSideLinksByPermissions(
  sideLinks: SideLink[],
  userPermissions: Record<string, string[]>
): SideLink[] {
  return sideLinks.filter((link) => {
    if (!link.resource) return true; // Mostrar siempre enlaces sin recurso
    const actions = userPermissions[link.resource];
    return actions?.includes("read"); // Mostrar solo si tiene permiso "read"
  });
} */

// Verifica si el usuario tiene permisos sobre un recurso
function hasPermissionForResource(
  resource: string,
  permissions: { resource: string; actions: string[] }[]
): boolean {
  return permissions.some(
    (permission) =>
      permission.resource === resource && permission.actions.includes("read")
  );
}

// Filtra las rutas principales según los permisos del usuario
function filterMainLinksByPermissions(
  sidelinks: SideLink[],
  permissions: { resource: string; actions: string[] }[]
): SideLink[] {
  return sidelinks.filter((link) => {
    return hasPermissionForResource(link.resource, permissions);
  });
}
// Filtra las subrutas de cada ruta
function filterSubLinksByPermissions(
  subLinks: NavLink[],
  permissions: { resource: string; actions: string[] }[]
): NavLink[] {
  return subLinks.filter((subLink) => {
    return hasPermissionForResource(subLink.resource, permissions);
  });
}

export const filterSideLinksByPermissions = (
  links: SideLink[],
  userPermissions: Record<string, string[]>
): SideLink[] => {
  // Filtramos los enlaces principales según los permisos del usuario
  const mainLinks = links.filter((link) => {
    const permissionsForResource = userPermissions[link.resource]; // Obtenemos las acciones permitidas para este recurso
    return permissionsForResource && permissionsForResource.includes("read"); // Si el usuario tiene permiso 'read' para ese recurso
  });

  // Filtramos los subenlaces dentro de cada enlace principal
  const filteredLinks = mainLinks.map((link) => {
    if (link.sub) {
      link.sub = link.sub.filter((subLink) => {
        const permissionsForResource = userPermissions[subLink.resource]; // Obtenemos las acciones permitidas para el subrecurso
        return (
          permissionsForResource && permissionsForResource.includes("read")
        ); // Si el usuario tiene permiso 'read' para este subrecurso
      });
    }
    return link;
  });

  return filteredLinks;
};
