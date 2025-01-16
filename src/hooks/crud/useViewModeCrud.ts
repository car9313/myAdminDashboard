import { useState } from "react";
import { ViewModeCrudType } from "@/interfaces/viewModeCrudType";

type UseViewModeCrudProp = {
  viewModeCrud: ViewModeCrudType;
};

const useViewModeCrud = ({ viewModeCrud }: UseViewModeCrudProp) => {
  const initialCurrentView = viewModeCrud === "card" ? true : false;
  const [currentView, setCurrentView] = useState<boolean>(initialCurrentView); // Estado para la vista seleccionada
  const handleViewChange = () => {
    if (viewModeCrud === "optional") {
      setCurrentView(!currentView);
    }
  };
  return { currentView, handleViewChange };
};
export default useViewModeCrud;
