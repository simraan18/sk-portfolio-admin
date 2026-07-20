import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import type { ResponseData, ResponseDataList } from "@/vite-env";
import type { CardCategory } from "@/model/CardCategory";

export const cardCategoryApi = createApi({
  baseQuery,
  reducerPath: "cardCategoryApi",
  tagTypes: ["CardCategory", "CardCategoryGetById"],
  endpoints: (build) => ({
    getCardCategories: build.query<ResponseDataList<CardCategory>, void>({
      query: () => "/card-category",
      providesTags: ["CardCategory"],
    }),
    createCardCategory: build.mutation<
      ResponseData<CardCategory>,
      Partial<CardCategory>,
      ResponseData<CardCategory>
    >({
      query: (payload) => ({
        url: "/card-category",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CardCategory", "CardCategoryGetById"],
    }),
    getCardCategoryById: build.query<ResponseData<CardCategory>, string>({
      query: (id) => ({
        url: `/card-category/${id}`,
        method: "GET",
      }),
      providesTags: ["CardCategoryGetById"],
    }),
    updateCardCategory: build.mutation<
      ResponseData<CardCategory>,
      { id: string; payload: Partial<CardCategory> },
      ResponseData<CardCategory>
    >({
      query: ({ id, payload }) => ({
        url: `/card-category/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["CardCategory", "CardCategoryGetById"],
    }),
  }),
});

export const {
  useGetCardCategoriesQuery,
  useCreateCardCategoryMutation,
  useGetCardCategoryByIdQuery,
  useUpdateCardCategoryMutation,
} = cardCategoryApi;
