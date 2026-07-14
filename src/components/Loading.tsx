import { cn } from "@/utils";
import { LoaderCircle } from "lucide-react";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-full w-full",
        className,
      )}
    >
      <LoaderCircle size={25} className="animate-spin text-primary" />
      <h1 className="text-primary sm:text-lg text-sm text-center">
        Loading...
      </h1>
    </div>
  );
};

export default Loading;
