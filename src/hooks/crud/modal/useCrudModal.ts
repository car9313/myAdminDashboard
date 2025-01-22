import useManagerModal from "@/hooks/crud/modal/useManagerModal";
import { DataApiProps } from "@/interfaces/dataApi";
import useModalActionCrud from "./useModalActionCrud";
import { WithId } from "@/interfaces/withId";
import useFilterData from "@/hooks/useFilterData";
import usePagination from "@/hooks/usePagination";
import UseGetAllFromApi from "@/hooks/useGetAllFromApi";
import { ActionDef } from "@/interfaces/actionDef";
import { useMemo } from "react";
import useGetActionsWithPermissions from "@/hooks/useGetActionsWithPermissions";

interface UseCrudModalProps<T> {
  dataApi: DataApiProps;
  extraActions?: ActionDef<T>[];
}
const useCrudModal = <T extends WithId, TFilters>({
  dataApi,
  extraActions,
}: UseCrudModalProps<T>) => {
  const modalManager = useManagerModal<T>();
  const { crudActions, handleOpenModal, handleCloseModal } =
    useModalActionCrud<T>({
      modalManager,
    });
  const { appliedFilters, handleApplyFilters, handleClearFilters } =
    useFilterData<TFilters>();

  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination<TFilters>({ appliedFilters });

  const { data, isLoading, isError } = UseGetAllFromApi<T, TFilters>({
    ...dataApi,
    appliedFilters,
    page: currentPage,
    pageSize,
  });
  const actions: ActionDef<T>[] = useMemo(
    () => (extraActions ? [...crudActions, ...extraActions] : crudActions),
    [crudActions, extraActions]
  );

  const { listActions = [], hasPermission } = useGetActionsWithPermissions<T>({
    resource: "Item",
    actions,
  });

  return {
    data,
    isLoading,
    isError,
    modalManager,
    listActions,
    hasPermission,
    handleOpenModal,
    handleCloseModal,
    appliedFilters,
    handleApplyFilters,
    handleClearFilters,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default useCrudModal;
