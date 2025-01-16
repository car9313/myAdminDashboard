import useCrudQueryActions from "@/hooks/useCrudQueryActions";
import { WithId } from "@/interfaces/withId";

interface UseCrudActionPropsdataApi<T> {
  dataApi: { key: string; endPoint: string };
  currentItem: T | undefined;
  onAfterSubmit: () => void;
}
const useDeleteAction = <T extends WithId>({
  dataApi,
  currentItem,
  onAfterSubmit,
}: UseCrudActionPropsdataApi<T>) => {
  const { mutationDelete } = useCrudQueryActions<T>({ ...dataApi });

  const handleDelete = () => {
    mutationDelete.mutate(currentItem?.id, {
      onError: (error) => {
        console.error("Error eliminando el ítem:", error);
      },
      onSettled: () => {
        onAfterSubmit();
      },
    });
  };

  return {
    handleDelete,
  };
};
export default useDeleteAction;
