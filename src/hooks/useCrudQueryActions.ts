import {
  createFromApi,
  deleteFromApi,
  updateFromApi,
} from "@/services/crudGenericFormApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseCrudActionsProps {
  key: string;
  endPoint: string;
}

const useCrudQueryActions = <T>({ key, endPoint }: UseCrudActionsProps) => {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: (newItem: T) => createFromApi(endPoint, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, updatedItem }: { id: string; updatedItem: T }) =>
      updateFromApi(endPoint, id, updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id: string) => deleteFromApi(endPoint, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    },
  });
  return {
    mutationCreate,
    mutationUpdate,
    mutationDelete,
  };
};
export default useCrudQueryActions;
