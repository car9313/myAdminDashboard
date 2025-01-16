import { ActionsList, CrudActionConfig } from "@/interfaces/actionsList";

/* export const generateActions = (
  customConfig: Partial<CrudActionConfig>
): ActionsList => {
  
  //  const mergedConfig = { ...defaultConfig, ...customConfig };
  return Object.keys(customConfig).reduce((actions, key) => {
    const actionKey = key as keyof CrudActionConfig;
    const config = customConfig[actionKey]; // Guardamos en una constante para reutilizarlo
    if (config) {
      actions[actionKey] = {
        actions: config.permissions,
        label: config.label,
        icon: config.icon, // Propiedades personalizadas
        style: config.style, // Propiedades personalizadas
        callback:config.
      };
    }
    return actions;
  }, {} as ActionsList);
};
 */
