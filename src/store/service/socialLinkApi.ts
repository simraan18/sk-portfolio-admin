import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import type { ResponseData, ResponseDataList } from "@/vite-env";
import type { SocialLink } from "@/model/SocialLinkModel";

export const socialLinkApi = createApi({
  reducerPath: "socialLinkApi",
  baseQuery: baseQuery,
  tagTypes: ["SocialLink"],
  endpoints: (builder) => ({
    getAllSocialLinks: builder.query<ResponseDataList<SocialLink>, void>({
      query: () => "/social-link",
      providesTags: ["SocialLink"],
    }),
    createSocialLink: builder.mutation<
      ResponseData<SocialLink>,
      Partial<SocialLink>
    >({
      query: (socialLink) => ({
        url: "/social-link",
        method: "POST",
        body: socialLink,
      }),
      invalidatesTags: ["SocialLink"],
    }),
    getSocialLinkById: builder.query<ResponseData<SocialLink>, string>({
      query: (id) => ({
        url: `/social-link/${id}`,
        method: "GET",
      }),
      providesTags: ["SocialLink"],
    }),
    updateSocialLink: builder.mutation<
      ResponseData<SocialLink>,
      { id: string; payload: Partial<SocialLink> }
    >({
      query: ({ id, payload }) => ({
        url: `/social-link/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["SocialLink"],
    }),
  }),
});

export const {
  useGetAllSocialLinksQuery,
  useCreateSocialLinkMutation,
  useGetSocialLinkByIdQuery,
  useUpdateSocialLinkMutation,
} = socialLinkApi;
