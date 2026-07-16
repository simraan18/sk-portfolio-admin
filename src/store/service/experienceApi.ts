import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import type { ResponseData, ResponseDataList } from "@/vite-env";
import type { Experience } from "@/model/ExperienceModel";

export const experienceApi = createApi({
  baseQuery,
  reducerPath: "experienceApi",
  tagTypes: ["Experience"],
  endpoints: (builder) => ({
    getExperienceList: builder.query<ResponseDataList<Experience>, void>({
      query: () => ({
        url: "/experience",
        method: "GET",
      }),
      providesTags: ["Experience"],
    }),
    createExperience: builder.mutation<
      ResponseData<Experience>,
      Partial<Experience>
    >({
      query: (experience) => ({
        url: "/experience",
        method: "POST",
        body: experience,
      }),
      invalidatesTags: ["Experience"],
    }),
    getExperienceById: builder.query<ResponseData<Experience>, string>({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "GET",
      }),
      providesTags: ["Experience"],
    }),
    updateExperience: builder.mutation<
      ResponseData<Experience>,
      { id: string; payload: Partial<Experience> }
    >({
      query: ({ id, payload }) => ({
        url: `/experience/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Experience"],
    }),
  }),
});

export const {
  useGetExperienceListQuery,
  useCreateExperienceMutation,
  useGetExperienceByIdQuery,
  useUpdateExperienceMutation,
} = experienceApi;
