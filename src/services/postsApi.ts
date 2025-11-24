import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Post = {
  id: number;
  url: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: "published" | "unpublished";
  category: "lorem";
  publishedAt: string;
  updatedAt: string;
  userId: number;
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApi;
