import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import type { AppUser, ResponseData } from "@/vite-env";

type AuthPayload = { email: string; password: string };

export const authApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation<
      ResponseData<{ access_token: string }>,
      AuthPayload,
      ResponseData<{ access_token: string }>
    >({
      query: (payload) => {
        return {
          url: "/auth/sign-in",
          method: "POST",
          body: payload,
        };
      },
    }),
    getUser: builder.query<ResponseData<AppUser>, void>({
      query: () => "/auth/me",
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignInMutation, useGetUserQuery, useSignOutMutation } =
  authApi;
