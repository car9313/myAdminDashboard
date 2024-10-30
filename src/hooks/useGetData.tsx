import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllElementsFromApi } from "@/pages/generic/services/itemService";

interface UseManagementDataAndModalProps {
  endPoint: string;
}
interface UseManagementDataAndModalReturn<T> {
  data: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}
const useGetData = <T extends object>({
  endPoint,
}: UseManagementDataAndModalProps): UseManagementDataAndModalReturn<T> => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["items"],
    queryFn: () => {
      console.log("Query");
      return getAllElementsFromApi<T>(endPoint);
    },
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export default useGetData;
