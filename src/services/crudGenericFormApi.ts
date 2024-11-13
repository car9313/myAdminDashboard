import { axiosInstance } from "@/lib/axios";
const URL_BASE = "http://localhost:3000";

interface FetchDataOptions<TFilters> {
  endPoint: string;
  appliedFilters: TFilters;
}

export const getAllFromApi = async <TData, TFilters>(
  options: FetchDataOptions<TFilters>
): Promise<TData[]> => {
  const { endPoint, appliedFilters } = options;
  const response = await axiosInstance.get<TData[]>(`${URL_BASE}/${endPoint}`, {
    params: appliedFilters,
  });
  console.log(response)
  return response.data;
};

export const createFromApi = async <T>(url: string, newItem: T): Promise<T> => {
  const response = await axiosInstance.post(`${URL_BASE}/${url}`, newItem);
  return response.data;
};
export const deleteFromApi = async (url: string, id: string): Promise<void> =>
  await axiosInstance.delete(`${URL_BASE}/${url}/${id}`);

export const updateFromApi = async <T>(
  url: string,
  id: string,
  itemEdited: T
) => {
  await axiosInstance.put(`${URL_BASE}/${url}/${id}`, itemEdited);
};
