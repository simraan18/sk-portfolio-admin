import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SamplePost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getSamplePost: builder.query<SamplePost, void>({
      query: () => "posts/1",
    }),
  }),
});

export const { useGetSamplePostQuery } = portfolioApi;
