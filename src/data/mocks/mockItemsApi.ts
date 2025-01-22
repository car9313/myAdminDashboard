/* import { Item } from "@/pages/privates/items/models/item";

// Simula una base de datos con 50 ítems
const mockItems: any = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Descripción del Item ${i + 1}`,
  description1: `Descripción1 del Item ${i + 1}`,
  description2: `Descripción2 del Item ${i + 1}`,
  description3: `Descripción3 del Item ${i + 1}`,
  //  category: `Categoría ${(i % 5) + 1}`,
}));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockItemsApi = {
  fetchItems: async (
    page: number = 1,
    pageSize: number = 30,
    //filters?: Partial<Item>
    filters: any
  ) => {
    await delay(500); // Simula un retraso en la respuesta del servidor
    // Filtrado simple
    let filteredItems = mockItems;
    if (filters) {
      filteredItems = mockItems.filter((item: { [x: string]: any }) =>
        Object.entries(filters).every(([key, value]) =>
          value ? String(item[key as keyof Item]).includes(String(value)) : true
        )
      );
    }
    // Paginación
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    console.log(paginatedItems);
    console.log(startIndex);
    console.log(endIndex);
    return {
      objects: paginatedItems,
      total: filteredItems.length,
    };
  },
};
 */

import { Item } from "@/pages/privates/items/models/item";
const mockItems: Item[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Descripción del Item ${i + 1}`,
  description1: `Descripción1 del Item ${i + 1}`,
  description2: `Descripción2 del Item ${i + 1}`,
  description3: `Descripción3 del Item ${i + 1}`,
}));
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const filterItems = (items: Item[], filters?: Partial<Item>): Item[] => {
  if (!filters || Object.keys(filters).length === 0) return items;
  return items.filter((item) =>
    Object.entries(filters).every(([key, value]) =>
      value ? String(item[key as keyof Item]).includes(String(value)) : true
    )
  );
};
const paginateItems = (items: Item[], page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};
export const mockItemsApi = {
  fetchItems: async (
    page: number = 1,
    pageSize: number = 30,
    filters?: Partial<Item>
  ) => {
    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = 10;
    await delay(500);
    const filteredItems = filterItems(mockItems, filters);
    const paginatedItems = paginateItems(filteredItems, page, pageSize);
    return {
      objects: paginatedItems,
      total: filteredItems.length,
    };
  },
};
