import { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Input } from "../ui/input";

interface TagInputFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
}

const TagInputField = <T extends FieldValues>({
  label,
  placeholder,
  ...controllerProps
}: TagInputFieldProps<T>) => {
  const { field } = useController(controllerProps);
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !field.value.includes(inputValue)) {
      field.onChange([...field.value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    field.onChange(field.value.filter((t: string) => t !== tag));
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="tag-input-container">
          <div className="tags">
            {field.value.map((tag: string, index: number) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="input-container">
            <Input
              type="text"
              className="input-class-name" // Replace with your input class
              placeholder={placeholder || "Add a keyword..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <button type="button" onClick={handleAddTag}>
              Add
            </button>
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default TagInputField;
