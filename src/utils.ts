import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import type { ApiErrorResponse } from "./vite-env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clipText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

export function apiError(error: unknown) {
  let message = "Something went wrong!";
  const err = error as ApiErrorResponse;
  if (err?.data?.message) {
    message =
      typeof err.data.message === "string"
        ? err.data.message
        : err.data.message[0];
  }
  toast.error(message);
}
