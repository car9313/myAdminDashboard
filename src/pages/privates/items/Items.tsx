import useFilterData from "@/hooks/useFilterData";
import { Filters } from "./models/filters";
import FilterForm from "./components/FilterForm";
import { Item } from "./models/item";
import { dataApi } from "./data/dataApi";
import { colDef } from "./data/colDef";
import { extraActions } from "./data/extraAction";
import CrudContent from "@/components/Crud/modal/CrudContent";

const Items = () => {
  const { appliedFilters, handleApplyFilters, handleClearFilters } =
    useFilterData<Filters>();

  return (
    <CrudContent<Item, Filters>
      resource="Item"
      dataApi={dataApi}
      colDef={colDef}
      appliedFilters={appliedFilters}
      viewModeCrud="table"
      extraActions={extraActions}
    >
      <FilterForm
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </CrudContent>
  );
};

export default Items;
