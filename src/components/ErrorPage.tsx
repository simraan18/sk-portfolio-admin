import { useRouteError, isRouteErrorResponse } from "react-router";
import { Button } from "./ui/button";

const ErrorPage = () => {
  const error = useRouteError() as any;

  return (
    <div className="flex min-h-full items-center justify-center bg-base px-6 py-12">
      <div className="flex w-full max-w-xl flex-col items-center rounded-3xl border border-surface-border bg-surface/80 px-8 py-12 text-center">
        <div className="mb-4 flex h-16 px-2 items-center justify-center rounded-2xl bg-accent-dim text-2xl font-semibold text-brand">
          Oops!
        </div>
        <h1 className="mb-3 text-3xl font-semibold text-copy-primary">
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error?.message || "Unknown Error"}
        </h1>
        <p className="max-w-md leading-7 text-copy-secondary">
          Something went wrong on our end. Please try again later.
        </p>
        <Button
          type="button"
          variant="link"
          onClick={() => window.location.reload()}
          className="no-underline! cursor-pointer"
        >
          Retry!
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
