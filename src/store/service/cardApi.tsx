import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import type { ResponseData, ResponseDataList } from "@/vite-env";
import type { Card } from "@/model/CardModel";

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery,
  tagTypes: ["Card"],
  endpoints: (builder) => ({
    getAllCards: builder.query<ResponseDataList<Card>, void>({
      query: () => "/card",
      providesTags: ["Card"],
    }),
    createCard: builder.mutation<
      ResponseData<Card>,
      Partial<Card>,
      ResponseData<Card>
    >({
      query: (card) => ({
        url: "/card",
        method: "POST",
        body: card,
      }),
      invalidatesTags: ["Card"],
    }),
    getCardById: builder.query<ResponseData<Card>, string>({
      query: (id) => ({
        url: `/card/card-id/${id}`,
        method: "GET",
      }),
      providesTags: ["Card"],
    }),
    updateCard: builder.mutation<
      ResponseData<Card>,
      { id: string; payload: Partial<Card> },
      ResponseData<Card>
    >({
      query: ({ payload, id }) => ({
        url: `/card/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Card"],
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useCreateCardMutation,
  useGetCardByIdQuery,
  useUpdateCardMutation,
} = cardApi;
