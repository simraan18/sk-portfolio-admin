/// <reference types="vite/client" />

import type { LucideIcon } from "lucide-react";
import type { sidePanelKeys } from "./routes/navigation";

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

interface ResponseDataList<T> {
  requestId: string;
  response: { data: T[]; total: number };
  statusCode: number;
  timestamp: string;
}

interface AppUser extends AdminBaseEntity {
  email: string;
  name: string;
}

interface ISidebar {
  [key: string]: {
    label: string;
    navigations: IAppNavigation[];
  };
}
