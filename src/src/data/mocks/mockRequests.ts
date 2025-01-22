import {
  Solicitud,
  StatusSolicitud,
} from "@/pages/privates/requests/models/requests";

export interface Meta {
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
}
export interface ResponseData {
  objects: any[];
  meta: Meta;
}
const mockSolicitudes: any[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  cantidad: Math.floor(Math.random() * 10) + 1, // Cantidad aleatoria entre 1 y 10
  status_solicitud: [
    "EN_PRODUCCION",
    "PENDIENTE_DE_COMPROBACION",
    "FINALIZADO",
  ][Math.floor(Math.random() * 3)] as StatusSolicitud,
  fecha_solicitud: new Date(
    Date.now() - i * 1000 * 60 * 60 // Diferencia de una hora entre cada solicitud
  ).toLocaleString("es-ES", { hour12: false }), // Formato "DD/MM/YYYY HH:mm"
}));
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const paginateSolicitudes = (
  items: any[],
  page: number,
  pageSize: number
): { paginatedItems: any[]; meta: Meta } => {
  const startIndex = (page - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  return {
    paginatedItems,
    meta: {
      current_page: page,
      next_page: startIndex + pageSize < items.length ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
      total_pages: Math.ceil(items.length / pageSize),
      total_count: items.length,
    },
  };
};
const filterSolicitudes = (
  items: any[],
  filters?: Partial<Solicitud>
): any[] => {
  if (!filters || Object.keys(filters).length === 0) return items;
  return items.filter((item) =>
    Object.entries(filters).every(([key, value]) =>
      value
        ? String(item[key as keyof Solicitud]).includes(String(value))
        : true
    )
  );
};

export const mockSolicitudesApi = {
  fetchSolicitudes: async (
    page: number = 1,
    pageSize: number = 10,
    filters?: Partial<Solicitud>
  ) /* : Promise<ResponseData> */ => {
    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = 10;
    await delay(1000); // Simula un retraso
    const filteredItems = filterSolicitudes(mockSolicitudes, filters);
    const { paginatedItems, meta } = paginateSolicitudes(
      filteredItems,
      page,
      pageSize
    );
    return {
      objects: paginatedItems,
      meta,
    };
  },
};
