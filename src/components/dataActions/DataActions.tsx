import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataActionsProps } from "@/interfaces/action";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

const DataActions = <T, _TValue>({
  itemSelected,
  actions,
}: DataActionsProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actions &&
          actions.length > 0 &&
          actions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => action.action(itemSelected)}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DataActions;
