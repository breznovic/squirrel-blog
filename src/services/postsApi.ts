import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Post = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  thumbnail_url: string;
  published_at: string;
  updated_at: string;
  user_id: number;
  author: string;
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getBlogPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
  }),
});

export const { useGetBlogPostsQuery } = postsApi;
