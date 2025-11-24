import { useGetAllPostsQuery } from "../../services/postsApi";
import PostPreviewCard from "../PostPreviewCard/PostPreviewCard";
import { useMemo } from "react";
import s from "./PostsList.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const PostsList = () => {
  const searchQuery = useSelector((state: RootState) => state.search.query);
  
  const { data: posts, error, isLoading } = useGetAllPostsQuery();

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    if (!searchQuery.trim()) return posts;

    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  if (!filteredPosts?.length) {
    return (
      <div className={s.noResults}>
        {searchQuery ? (
          <>
            <h3 className={s.searchResults}>No posts found for "{searchQuery}"</h3>
            <p className={s.searchResults}>Try different keywords or browse all posts</p>
          </>
        ) : (
          <h3>No posts available</h3>
        )}
      </div>
    );
  }

  return (
    <>
      {error ? (
        <div>Oh no, there was an error</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : posts ? (
        <div className={s.container}>
          {searchQuery && (
            <div className={s.searchResults}>
              Found {filteredPosts.length} post
              {filteredPosts.length !== 1 ? "s" : ""} for "{searchQuery}"
            </div>
          )}

          <div className={s.posts}>
            {filteredPosts.map((post) => (
              <PostPreviewCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PostsList;
