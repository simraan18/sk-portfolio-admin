/// <reference types="vite/client" />

import type { LucideIcon } from "lucide-react";

interface IAppNavigation {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

interface AdminBaseEntity {
  id: string;
}

interface ResponseData<T> {
  requestId: string;
  response: T;
  statusCode: number;
  timestamp: string;
}

interface ErrorData {
  success: boolean;
  statusCode: number;
  path: string;
  timestamp: string;
  message: string | string[];
}

interface ApiErrorResponse {
  data: ErrorData;
  status: number;
}
