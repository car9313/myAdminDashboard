import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

interface ColumnFiltersProps {
    onFilterChange: (filter: { name: string; value: string }) => void;
  }
const ColumnFilters = ({ onFilterChange }: ColumnFiltersProps) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] =useState<string>("");
    
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      const nameChanged= e.target.value
      setName(nameChanged);
        onFilterChange({ name: "name", value: nameChanged });
      };
      const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const descriptionChanged= e.target.value
        setDescription(e.target.value );
        onFilterChange({ name: "description", value: descriptionChanged });
      };
    return (
        <div className="flex items-center justify-between">
             <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input type={"text"}
          placeholder="Filter name..."
          value={name}
          onChange={handleNameChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
         <Input type={"text"}
          placeholder="Filter description..."
          value={description}
          onChange={handleDescriptionChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        </div>
        </div>
  )
}

export default ColumnFilters