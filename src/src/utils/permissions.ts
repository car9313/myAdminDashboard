import { Permission, Role, User } from "@/interfaces/auth";

/**
 * Verifica si un recurso tiene permisos específicos.
 * @param {string[]} permissionsForResource - Acciones permitidas para el recurso.
 * @returns {boolean} - `true` si se encuentra el permiso `read`, de lo contrario, `false`.
 */
export function hasPermissionForResource(
  permissionsForResource: string[]
): boolean {
  // return permissionsForResource && permissionsForResource.includes("read"); // Si el usuario tiene permiso 'read' para ese recurso
  return !!permissionsForResource?.includes("read"); // Verifica que exista y contenga 'read'
}
/**
 * Mapea los permisos de un usuario a un formato de recurso y acciones.
 * @param {User} user - Usuario con roles y permisos.
 * @returns {Record<string, string[]>} - Objeto que relaciona recursos con acciones permitidas.
 */
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

/**
 * Obtiene el conjunto de acciones concedidas para un recurso específico.
 * @param {Role[]} roles - Lista de roles del usuario.
 * @param {string} resource - Recurso objetivo.
 * @returns {Set<string>} - Conjunto de acciones permitidas.
 */
export const getGrantedActions = (
  roles: Role[],
  resource: string
): Set<string> => {
  const granted = new Set<string>();
  roles.forEach((role) => {
    role.permissions.forEach((perm: Permission) => {
      if (perm.resource === resource) {
        perm.actions.forEach((action) => granted.add(action));
      }
    });
  });

  return granted;
};
/**
 * Verifica si un usuario tiene permisos específicos para un recurso.
 * @typedef {Object} CheckPermissionsProps
 * @property {User | undefined} user - Usuario que solicita permisos.
 * @property {string} resource - Recurso al que se desea acceder.
 * @property {string[]} actions - Lista de acciones requeridas.
 *
 * @param {CheckPermissionsProps} props - Propiedades necesarias para evaluar permisos.
 * @returns {{hasAll: boolean, missing: string[], granted: Set<string>}} - Resumen de los permisos evaluados.
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
