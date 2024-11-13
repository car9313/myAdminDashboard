// Función auxiliar para obtener propiedades de manera segura
export const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
    return obj[key];
  };
  
  // Función para formatear valores
  export const formatValue = (value: any): string => {
    if (value instanceof Date) {
      return value.toLocaleDateString(); // Formateo de fechas
    }
    if (typeof value === 'number') {
      return value.toLocaleString(); // Formateo de números
    }
    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No'; // Formateo de booleanos
    }
    return String(value); // Formateo genérico
  };