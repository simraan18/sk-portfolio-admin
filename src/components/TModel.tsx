import { type ReactElement, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface TModelProps {
  trigger?: ReactElement;
  children: ReactNode;
  footer?: ReactNode | ReactElement;
  title: ReactNode;
  description?: ReactNode;
  closeTrigger?: ReactElement;
}

const TModel = ({
  trigger,
  children,
  footer,
  title,
  description,
  closeTrigger,
}: TModelProps) => {
  const renderTrigger = trigger ? (
    trigger
  ) : (
    <Button
      type="button"
      variant="link"
      className="cursor-pointer text-sm text-primary no-underline!"
    >
      View {title}
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger render={renderTrigger} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          {footer && footer}
          <DialogClose render={closeTrigger} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TModel;
