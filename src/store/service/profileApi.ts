import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import type { ResponseData } from "@/vite-env";
import type { Profile } from "@/model/ProfileModel";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<ResponseData<Profile>, void>({
      query: () => "/profile",
    }),
    addProfile: builder.mutation({
      query: (profilePayload) => ({
        url: "/profile",
        method: "POST",
        body: profilePayload,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
