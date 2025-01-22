import { mockItemsApi } from "@/data/mocks/mockItemsApi";
import { Meta, mockSolicitudesApi } from "@/data/mocks/mockRequests";
import { WithId, WithIdType } from "@/interfaces/withId";
import { axiosInstance } from "@/lib/axios";
interface FetchDataOptions<TFilters> {
  endPoint: string;
  appliedFilters?: TFilters | null;
  page?: number;
  pageSize?: number;
}
export interface PaginatedResponse<T> {
  objects: T[]; // Lista de ítems
  meta: Meta;
}

/* interface PaginatedResponse<T> {
  objects: T[]; // Lista de ítems
  total: number; // Cantidad total de elementos
} */
/*  interface PaginatedResponse<T> {
    objects: T[]; // Lista de ítems
    total: number; // Cantidad total de elementos
  } 
export const getAllFromApi = async <TData, TFilters>(
  options: FetchDataOptions<TFilters>
): Promise<PaginatedResponse<TData>> => {
  const { endPoint, appliedFilters, page, pageSize } = options;
  try {
  } catch (error) {}
  const response = await axiosInstance.get<PaginatedResponse<TData>>(
    `/${endPoint}`,
    {
      params: { appliedFilters, page, pageSize },
    }
  );

  return response.data;
}; */

export const fetchItems = async <TData, TFilters>({
  page,
  pageSize,
  filters,
}: {
  page: number;
  pageSize: number;
  filters?: TFilters;
}): Promise<PaginatedResponse<TData>> => {
  console.log(page, pageSize, filters);
  /* const response = await mockItemsApi.fetchItems(page, pageSize, filters);
   */
  const response = await mockSolicitudesApi.fetchSolicitudes(page, pageSize, {
    status_solicitud: "PENDIENTE_DE_COMPROBACION",
  });

  return response;
};
export const getItemID = async <TData>({
  id,
  endPoint,
}: {
  id: string | number | undefined;
  endPoint: string;
}): Promise<TData> => {
  if (!id) throw new Error("ID indefinido");
  const response = await axiosInstance.get<TData>(`/${endPoint}`);
  return response.data;
};

export const createFromApi = async <T>(url: string, newItem: T): Promise<T> => {
  const response = await axiosInstance.post(`/${url}`, newItem);
  return response.data;
};
export const deleteFromApi = async (
  url: string,
  id: WithIdType
): Promise<void> => {
  console.log(id);
  console.log(url);
  try {
    await axiosInstance.delete(`/${url}/${id}`);
  } catch (error: any) {
    // Captura cualquier error y proporciona un mensaje adecuado
    console.error("Error al eliminar el elemento", error);
    throw new Error(
      `Error al eliminar el elemento: ${error.message || "Error desconocido"}`
    );
  }
};

export const updateFromApi = async <T>(
  url: string,
  id: WithIdType,
  itemEdited: T
) => {
  await axiosInstance.put(`/${url}/${id}`, itemEdited);
};
