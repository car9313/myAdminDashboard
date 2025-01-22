import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ViewToggleProps {
  onViewChange: () => void;
}

const ViewToggle = ({ onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center  justify-center gap-2 bg-secondary p-2 rounded-md hover:text-primary transition-colors duration-300">
      <Label htmlFor="airplane-mode">Card Mode</Label>
      <Switch onCheckedChange={onViewChange} />
    </div>
  );
};

export default ViewToggle;
