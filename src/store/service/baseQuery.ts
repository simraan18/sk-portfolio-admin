import { type BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { routePath } from "@/routes/route-path";
import { toast } from "sonner";

export const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const userToken = (getState() as RootState)?.auth?.token;

    if (userToken) {
      headers.set("Authorization", `Bearer ${userToken}`);
    }

    return headers;
  },
  async responseHandler(response) {
    if (response.status === 403 || response.status === 401) {
      toast.warning("Unauthorized");
      localStorage.clear();
      window.location.href = routePath.login;
      return null;
    }
    const responseData = await response.json();
    return responseData;
  },
});
