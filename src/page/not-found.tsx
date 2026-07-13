import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full items-center justify-center bg-base px-6 py-12">
      <div className="flex w-full max-w-xl flex-col items-center rounded-3xl border border-surface-border bg-surface/80 px-8 py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-dim text-2xl font-semibold text-brand">
          404
        </div>
        <h1 className="mb-3 text-3xl font-semibold text-copy-primary">
          Page not found
        </h1>
        <p className="mb-8 max-w-md leading-7 text-copy-secondary">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Return to the home screen to continue managing your portfolio.
        </p>
        <Button className="cursor-pointer" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
