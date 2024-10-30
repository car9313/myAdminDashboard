import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ViewToggleProps {
  currentView: boolean;
  onViewChange: (view: boolean) => void;
}

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch onCheckedChange={() => onViewChange(!currentView)} />
      <Label htmlFor="airplane-mode">Card Mode</Label>
    </div>
  );
};

export default ViewToggle;
