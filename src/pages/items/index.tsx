import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Item } from "./models/item";
import { useState } from "react";
import { ItemFormSchema } from "./schemas/itemSchema";
import { DataTable } from "@/components/dataTable/DataTable";
import WindowsModal from "@/components/modal/WindowsModal";
import CrudForm from "./components/CrudForm";
import { createItemColumns } from "./components/Columns";

import { Button } from "@/components/ui/button";
import ColumnFilters from "./components/ColumnFilters";
import CardItem from "./components/CardItem";
import ViewToggle from "@/components/viewToggle/ViewToggle";
import { Action } from "@/interfaces/action";
import {
  createFromApi,
  deleteFromApi,
  FetchItemsParams,
  getAllFromApi,
  updateFromApi,
} from "@/services/crudGenericFormApi";

const ItemCrud = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [filters, setFilters] = useState<FetchItemsParams>({});
  const [currentView, setCurrentView] = useState<boolean>(false); // Estado para la vista seleccionada
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add"); // Modo de la modal
  const queryClient = useQueryClient();



  const url = "http://localhost:3000/items";
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery<Item[]>({
    queryKey: ["items", filters],
    queryFn: () => getAllFromApi(url, filters),
  });

  const mutationCreate = useMutation({
    mutationFn: (newItem: ItemFormSchema) => createFromApi(url, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({
      id,
      updatedItem,
    }: {
      id: string;
      updatedItem: ItemFormSchema;
    }) => updateFromApi(url, id, updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id: string) => deleteFromApi(url, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  const handleOpenModal = (
    item?: Item,
    mode: "add" | "edit" | "view" = "add"
  ) => {
    setCurrentItem(item || null);
    setIsModalOpen(true);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };
  const handleSubmit = (formData: ItemFormSchema) => {
    if (modalMode === "edit" && currentItem) {
      mutationUpdate.mutate({
        id: currentItem.id,
        updatedItem: formData,
      });
    } else if (modalMode === "add") {
      mutationCreate.mutate(formData);
    }
    handleCloseModal();
  };

  const handleFilterChange = (filter: { name: string; value: string }) => {
    setFilters((prev) => ({
      ...prev,
      [filter.name]: filter.value || undefined, // Convertir valor vacío a undefined para no enviar
    }));
  };

  const additionalActions: Action<Item>[] = [
    {
      label: "Ver Detalles",
      action: (row: Item) => {
        handleOpenModal(row, "view");
      },
    },
    {
      label: "Editar",
      action: (row: Item) => {
        handleOpenModal(row, "edit");
      },
    },
    {
      label: "Delete",
      action: (row: Item) => {
        mutationDelete.mutate(row.id);
      },
    },
    {
      label: "Duplicate",
      action: (row: Item) => {
        console.log("Duplicating item:", row);
        // Implementar la lógica de duplicación aquí
      },
    },
    // Puedes agregar más acciones adicionales aquí
  ];

  const columns = createItemColumns({
    actions: additionalActions,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p className="text-red-500">
        <strong>Ha ocurrido un error al obtener los dados de la api</strong>
      </p>
    );

  const title =
    modalMode === "view"
      ? "Detalles del Item"
      : modalMode === "edit"
        ? "Editar Item"
        : "Nuevo Item";
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">CRUD</h1>
        <Button onClick={() => handleOpenModal(undefined, "add")}>Add</Button>
      </div>
      <div className="space-y-4">
        <ViewToggle currentView={currentView} onViewChange={setCurrentView} />{" "}
        <ColumnFilters onFilterChange={handleFilterChange} />
        {!currentView ? (
          <DataTable data={items} columns={columns} />
        ) : (
          <div className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {items.length > 0 ? (
              items.map((item) => (
                <CardItem itemSelected={item} actions={additionalActions} />
              ))
            ) : (
              <p>No existen elementos para mostrar</p>
            )}
          </div>
        )}
      </div>
      <WindowsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
      >
        {modalMode === "view" ? (
          <div>
            <h2>{currentItem?.name}</h2>
            <p>Status: {currentItem?.name}</p>
            <p>Fecha: {currentItem?.description}</p>
          </div>
        ) : (
          <CrudForm onSubmit={handleSubmit} initialData={currentItem || {}} />
        )}
      </WindowsModal>
    </div>
  );
};
export default ItemCrud;
