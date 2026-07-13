import { routePath } from "@/routes/route-path";
import { cn } from "@/utils";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface PageTitleProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
  createPath?: (typeof routePath)[keyof typeof routePath];
}

const PageTitle = ({
  title,
  description,
  createPath,
  className,
  ...rest
}: PageTitleProps) => {
  return (
    <div
      {...rest}
      className={cn("flex w-full justify-between items-center", className)}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-lg sm:text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {createPath ? (
        <Link to={createPath} className="cursor-pointer">
          <Button>
            <Plus />
            <span>{`Create a ${title}`}</span>
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default PageTitle;
