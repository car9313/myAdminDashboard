import { useState } from "react";

interface UseFilterDataReturnProps<T> {
  appliedFilters: {} | T;
  handleApplyFilters: (filters: T | {}) => void;
  handleClearFilters: () => void;
}
const useFilterData = <T extends object>(): UseFilterDataReturnProps<T> => {
  const [appliedFilters, setAppliedFilters] = useState<T | {}>({});
  const handleApplyFilters = (filters: T | {}) => {
    setAppliedFilters(filters);
  };
  const handleClearFilters = () => {
    setAppliedFilters({});
  };
  return {
    appliedFilters,
    handleApplyFilters,
    handleClearFilters,
  };
};
export default useFilterData;
