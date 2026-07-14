import { type BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const userToken = (getState() as RootState)?.auth?.token;

    if (userToken) {
      headers.set("Authorization", `Bearer ${userToken}`);
    }

    return headers;
  },
});
