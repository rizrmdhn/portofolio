import { IconLoader2 } from "@tabler/icons-react";

export default function Loader() {
  return (
    <div className="flex h-full items-center justify-center pt-8">
      <IconLoader2 className="animate-spin" />
    </div>
  );
}
