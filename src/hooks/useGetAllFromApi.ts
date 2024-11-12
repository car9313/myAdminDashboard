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
  console.log(appliedFilters);
  console.log(key);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [key, appliedFilters],
    queryFn: () => getAllFromApi<TData, TFilters>({ endPoint, appliedFilters }),
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
