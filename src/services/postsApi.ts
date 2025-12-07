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
  category: string;
};

export type PaginatedPosts = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
  find: () => void;
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getBlogPosts: builder.query<PaginatedPosts, { sort?: "newest" | "oldest" }>(
      {
        query: ({ sort = "newest" }) => {
          const ordering = sort === "newest" ? "-published_at" : "published_at";
          return `posts/?ordering=${ordering}`;
        },
        keepUnusedDataFor: 0,
      }
    ),
  }),
});

export const { useGetBlogPostsQuery } = postsApi;
