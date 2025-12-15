import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showToast } from "../store/features/toasts/toastsSlice";

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

export type NewPost = {
  title: string;
  content: string;
  category: string;
  image_url?: string;
  thumbnail_url?: string;
  author?: string;
  user_id?: number;
};

export type UpdatePost = {
  id: number;
} & Partial<NewPost>;

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
    createPost: builder.mutation<Post, NewPost>({
      query: (newPost) => ({
        url: "posts/",
        method: "POST",
        body: {
          ...newPost,
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          author: newPost.author || "Squirrel Rusty",
          user_id: newPost.user_id || 1,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<Post, UpdatePost>({
      query: ({ id, ...data }) => ({
        url: `posts/${id}/`,
        method: "PATCH",
        body: {
          ...data,
          updated_at: new Date().toISOString(),
        },
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData(
            "getBlogPosts",
            { sort: "newest" },
            (draft) => {
              const post = draft.results.find((p) => p.id === id);
              if (post) {
                Object.assign(post, patch, {
                  updated_at: new Date().toISOString(),
                });
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}/`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData(
            "getBlogPosts",
            { sort: "newest" },
            (draft) => {
              draft.results = draft.results.filter((post) => post.id !== id);
              draft.count -= 1;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          dispatch(
            showToast({
              type: "error",
              message: "Failed to delete post. Changes reverted.",
            })
          );
        }
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetBlogPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
