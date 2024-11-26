import { useState } from "react";

interface UseFilterDataReturnProps<T> {
  appliedFilters: T | undefined;
  handleApplyFilters: (filters: T | undefined) => void;
  handleClearFilters: () => void;
}
const useFilterData = <T>(): UseFilterDataReturnProps<T> => {
  const [appliedFilters, setAppliedFilters] = useState<T | undefined>();
  const handleApplyFilters = (filters: T | undefined) => {
    setAppliedFilters(filters);
  };
  const handleClearFilters = () => {
    setAppliedFilters(undefined);
  };
  return {
    appliedFilters,
    handleApplyFilters,
    handleClearFilters,
  };
};
export default useFilterData;
