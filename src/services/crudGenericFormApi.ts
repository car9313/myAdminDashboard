import { axiosInstance } from "@/lib/axios";
interface FetchDataOptions<TFilters> {
  endPoint: string;
  appliedFilters?: TFilters;
}

export const getAllFromApi = async <TData, TFilters>(
  options: FetchDataOptions<TFilters>
): Promise<TData[]> => {
  const { endPoint, appliedFilters } = options;
  const response = await axiosInstance.get<TData[]>(`/${endPoint}`, {
    params: appliedFilters ? appliedFilters : null,
  });
  return response.data;
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
  id: number | string
): Promise<void> => {
  await axiosInstance.delete(`/${url}/${id}`);
};

export const updateFromApi = async <T>(
  url: string,
  id: string | number,
  itemEdited: T
) => {
  await axiosInstance.put(`/${url}/${id}`, itemEdited);
};
