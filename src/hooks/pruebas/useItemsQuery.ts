import { mockItemsApi } from "@/data/mocks/mockItemsApi";
import { Item } from "@/pages/privates/items/models/item";
import { useQuery } from "@tanstack/react-query";

interface UseItemsQueryProps {
  page: number;
  pageSize: number;
  filters?: Partial<Item>;
}

const fetchItems = async ({ page, pageSize, filters }: UseItemsQueryProps) => {
  const response = await mockItemsApi.fetchItems(page, pageSize, filters);
  return response;
};

export const useItemsQuery = (
  page: number,
  pageSize: number,
  filters?: Partial<Item>
) => {
  return useQuery({
    queryKey: ["items", page, pageSize, filters],
    queryFn: () => fetchItems({ page, pageSize, filters }),
    placeholderData: (previousData) => previousData, // Reemplaza keepPreviousData
    staleTime: 30000, // Datos obsoletos después de 30 segundos
    refetchOnWindowFocus: false, // Evita reconsultas innecesarias cuando el foco se mueve fuera de la ventana
  });
};
