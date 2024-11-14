import { useForm, FieldValues, DefaultValues } from "react-hook-form";


const useFilterState = <T extends FieldValues>(defaultValues: DefaultValues<T>) => {
  const methods = useForm<T>({
    defaultValues,
  });

  const clearFilters = () => {
    methods.reset();
  };

  return {
    ...methods,
    isDirty: methods.formState.isDirty,
    clearFilters,
  };
};
export default useFilterState;