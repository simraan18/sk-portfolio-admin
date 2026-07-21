import { cn } from "@/utils";

const Pagelayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("px-7 py-5 mx-auto pb-15", className)}>{children}</div>
  );
};

export default Pagelayout;
