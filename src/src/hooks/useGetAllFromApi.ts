import { fetchItems, PaginatedResponse } from "@/services/crudGenericFormApi";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
interface UseManagementDataAndModalProps<TFilters> {
  key: string;
  endPoint: string;
  appliedFilters?: TFilters | undefined;
  page: number;
  pageSize: number;
}
interface UseManagementDataAndModalReturn<T> {
  //  data: { objects: T[]; total: number } | undefined;
  data: PaginatedResponse<T> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PaginatedResponse<T>, Error>>;
}
const UseGetAllFromApi = <TData, TFilters>({
  key,
  endPoint,
  appliedFilters,
  page,
  pageSize,
}: UseManagementDataAndModalProps<TFilters>): UseManagementDataAndModalReturn<TData> => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [key, appliedFilters, page, pageSize],
    queryFn: async () =>
      /* await getAllFromApi<TData, TFilters>({
        endPoint,
        appliedFilters,
        page,
        pageSize,
      }) */
      await fetchItems<TData, TFilters>({
        filters: appliedFilters,
        page,
        pageSize,
      }),
    placeholderData: (previousData) => previousData, // Reemplaza keepPreviousData
    staleTime: 30000, // Datos obsoletos después de 30 segundos
    refetchOnWindowFocus: false, // Evita reconsultas innecesarias cuando el foco se mueve fuera de la ventana
  });
  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default UseGetAllFromApi;
