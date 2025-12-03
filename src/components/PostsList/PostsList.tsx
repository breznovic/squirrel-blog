import { useEffect, useCallback, useMemo, useReducer, useState } from "react";
import PostPreviewCard from "../PostPreviewCard/PostPreviewCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import s from "./PostsList.module.css";
import { useGetBlogPostsQuery } from "../../services/postsApi";

const POSTS_PER_LOAD = 3;

const postsReducer = (
  state: { visiblePosts: number },
  action: { type: "RESET" | "LOAD_MORE"; totalPosts?: number }
) => {
  switch (action.type) {
    case "RESET":
      return { visiblePosts: POSTS_PER_LOAD };
    case "LOAD_MORE":
      return {
        visiblePosts: Math.min(
          state.visiblePosts + POSTS_PER_LOAD,
          action.totalPosts || state.visiblePosts
        ),
      };
    default:
      return state;
  }
};

const PostsList = () => {
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const { data: allPosts, error, isLoading } = useGetBlogPostsQuery();
  const [state, dispatch] = useReducer(postsReducer, {
    visiblePosts: POSTS_PER_LOAD,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredPosts = useMemo(() => {
    const filtered =
      allPosts?.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

    return filtered;
  }, [allPosts, searchQuery]);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [searchQuery]);

  const loadMorePosts = useCallback(() => {
    dispatch({ type: "LOAD_MORE", totalPosts: filteredPosts.length });
  }, [filteredPosts.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePosts]);

  const postsToShow = filteredPosts.slice(0, state.visiblePosts);

  if (error) {
    return <div className={s.error}>Error loading posts</div>;
  }

  if (isLoading) {
    return <div className={s.loading}>Loading posts...</div>;
  }

  return (
    <div className={s.container}>
      {searchQuery && postsToShow.length > 0 && (
        <div className={s.searchResults}>
          Found {filteredPosts.length} post
          {filteredPosts.length !== 1 ? "s" : ""} for "{searchQuery}"
          {state.visiblePosts < filteredPosts.length &&
            ` (showing ${state.visiblePosts})`}
        </div>
      )}

      <div className={s.posts}>
        {postsToShow.map((post) => (
          <PostPreviewCard key={post.id} post={post} />
        ))}
      </div>

      {showScrollTop && (
        <button className={s.scrollTop} onClick={scrollToTop}>
          ⬆️
        </button>
      )}

      {postsToShow.length === 0 && (
        <div className={s.searchResults}>
          <h3>No posts found</h3>
          <p>Try different search keywords</p>
        </div>
      )}
    </div>
  );
};

export default PostsList;
