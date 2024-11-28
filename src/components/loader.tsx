import { IconLoader } from "@tabler/icons-react";

export default function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <IconLoader className="animate-spin" size={32} />
      <span className="sr-only">loading</span>
    </div>
  );
}
