import { SideLink } from "@/data/sidelinks";
import { hasPermissionForResource } from "./permissions";

/**
 * Filtra los enlaces principales según los permisos del usuario.
 * @param {SideLink[]} sidelinks - Lista de enlaces principales.
 * @param {Record<string, string[]>} userPermissions - Permisos del usuario organizados por recurso.
 * @returns {SideLink[]} - Lista de enlaces permitidos.
 */
function filterMainLinksByPermissions(
  sidelinks: SideLink[],
  userPermissions: Record<string, string[]>
): SideLink[] {
  // Filtramos los enlaces principales según los permisos del usuario
  return sidelinks.filter((link) =>
    hasPermissionForResource(userPermissions[link.resource])
  );
}
/**
 * Filtra subenlaces de forma inmutable según los permisos del usuario.
 * @param {SideLink[]} links - Lista de enlaces principales con subenlaces.
 * @param {Record<string, string[]>} userPermissions - Permisos del usuario organizados por recurso.
 * @returns {SideLink[]} - Enlaces principales con subenlaces filtrados.
 */
function filterSubLinksByPermissions(
  links: SideLink[],
  userPermissions: Record<string, string[]>
): SideLink[] {
  return links.map((link) => ({
    ...link,
    sub: link.sub
      ? link.sub.filter((subLink) =>
          hasPermissionForResource(userPermissions[subLink.resource])
        )
      : undefined,
  }));
}
/**
 * Filtra enlaces principales y subenlaces según los permisos del usuario.
 * @param {SideLink[]} links - Lista completa de enlaces principales y subenlaces.
 * @param {Record<string, string[]>} userPermissions - Permisos del usuario organizados por recurso.
 * @returns {SideLink[]} - Enlaces principales y subenlaces permitidos.
 */
export const filterSideLinksByPermissions = (
  links: SideLink[],
  userPermissions: Record<string, string[]>
): SideLink[] => {
  // Filtramos los enlaces principales según los permisos del usuario
  const mainLinks = filterMainLinksByPermissions(links, userPermissions);
  // Filtramos los subenlaces dentro de cada enlace principal
  return filterSubLinksByPermissions(mainLinks, userPermissions);
};
