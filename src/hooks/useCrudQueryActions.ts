import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  const mutationCreate = useMutation({
    mutationFn: async (newItem: T) => await createFromApi(endPoint, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user. Please try again.",
      });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async ({ id, updatedItem }: { id: string; updatedItem: T }) =>
      await updateFromApi(endPoint, id, updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    },

    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user. Please try again.",
      });
    },
    /*  onError: (error) => {
      //throw new Error(`Error al actualizar el elemento ${error}`);
      alert(`Error al actualizar el elemento ${error}`);
    }, */
  });

  const mutationDelete = useMutation({
    mutationFn: async (id: string) => await deleteFromApi(endPoint, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    },
    onError: (error) => {
      //throw new Error(`Error al actualizar el elemento ${error}`);
      alert(`Error al actualizar el elemento ${error}`);
    },
  });
  return {
    mutationCreate,
    mutationUpdate,
    mutationDelete,
  };
};
export default useCrudQueryActions;
