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
        variant: "success",
        title: "Éxito",
        description: "Elemento creado correctamente.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error al crear",
        description: error.message || "Hubo un problema al crear el elemento.",
      });
      console.error("Error al crear el elemento:", error);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async ({ id, updatedItem }: { id: string; updatedItem: T }) => {
      if (!id) {
        throw new Error("El ID proporcionado no es válido.");
      }
      return await updateFromApi(endPoint, id, updatedItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
      toast({
        variant: "success",
        title: "Éxito",
        description: "Elemento actualizado correctamente.",
      });
    },

    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description:
          error.message || "Hubo un problema al actualizar el elemento.",
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async (id: number | string) => {
      console.log(id);
      if (!id) {
        throw new Error("El id no pude ser null o undefine");
      }
      await deleteFromApi(endPoint, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
      toast({
        variant: "success",
        title: "Éxito",
        description: "Elemento eliminado correctamente.",
      });
    },
    onError: (error: Error) => {
      //throw new Error(`Error al actualizar el elemento ${error}`);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Hubo un problema al eliminar el elemento: ${error.message || "Error desconocido"}.`,
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
