import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/utils";
import type { ReactNode } from "react";

const FormLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <FieldGroup className={cn("grid sm:grid-cols-2 gap-4", className)}>
      {children}
    </FieldGroup>
  );
};

export default FormLayout;
