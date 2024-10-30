
import { axiosInstance } from "@/lib/axios";

export interface FetchItemsParams {
  filters?: {
    [index: string]: string; // Permitir otros filtros dinámicos
  };
  /* page?: number;
  pageSize?: number; */
}
export interface User {
  
  settings: { [key: string]: any };
}
let user :User={
  settings : {
    color: 1,
    gameStep: 34,
    gameName: 'Revenge of the Nerds'
  }
}

//const URL = "http://localhost:3000/items";
export const getAllFromApi = async <T>(
  url: string,
  filters: FetchItemsParams = {}
): Promise<T[]> => {
  console.log(url);
  console.log(filters);
  /* const queryParams = new URLSearchParams(); */
  console.log("Consulta con filtros");
  /* if (filters.name) {
    queryParams.append("name", filters.name);
  }

  if (filters.description) {
    queryParams.append("createdAt", filters.description);
  } */
  const response = await axiosInstance.get(`${url}?${filters.toString()}`);
  return response.data;
};

export const createFromApi = async <T>(url: string, newItem: T): Promise<T> => {
  const response = await axiosInstance.post(url, newItem);
  return response.data;
};
export const deleteFromApi = async (url: string, id: string): Promise<void> =>
  await axiosInstance.delete(`${url}/${id}`);

export const updateFromApi = async <T>(
  url: string,
  id: string,
  itemEdited: T
) => {
  await axiosInstance.put(`${url}/${id}`, itemEdited);
};
