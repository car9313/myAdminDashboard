import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ViewToggleProps {
  onViewChange: () => void;
}

const ViewToggle = ({ onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch onCheckedChange={onViewChange} />
      <Label htmlFor="airplane-mode">Card Mode</Label>
    </div>
  );
};

export default ViewToggle;
