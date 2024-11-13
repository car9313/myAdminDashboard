import { getAllFromApi } from "@/services/crudGenericFormApi";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
interface UseManagementDataAndModalProps<TFilters> {
  key: string;
  endPoint: string;
  appliedFilters: TFilters;
}
interface UseManagementDataAndModalReturn<T> {
  data: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<T[], Error>>;
}
const UseGetAllFromApi = <TData, TFilters>({
  key,
  endPoint,
  appliedFilters,
}: UseManagementDataAndModalProps<TFilters>): UseManagementDataAndModalReturn<TData> => {
  
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [key, appliedFilters],
    queryFn: () => getAllFromApi<TData, TFilters>({ endPoint, appliedFilters }),
    staleTime: 1000 * 60 * 5, // Los datos son frescos durante 5 minutos
    refetchOnWindowFocus: false, // No recargar al enfocar la ventana
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
