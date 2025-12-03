import { Link, useLocation, useParams } from "react-router";
import { useGetBlogPostsQuery } from "../../services/postsApi";
import s from "./PostCard.module.css";

function PostCard() {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const { data: posts, isLoading, error } = useGetBlogPostsQuery();
  const postId = id ? Number(id) : NaN;

  const postFromState = state?.post;

  if (postFromState) {
    return (
      <div className={s.post}>
        <h1 className={s.title}>{postFromState.title}</h1>
        <div className={s.content}>{postFromState.content}</div>
        <Link to="/posts" className={s.backLink}>
          ← Back to all posts
        </Link>
      </div>
    );
  }

  if (isLoading) return <div className={s.loading}>Loading...</div>;
  if (error) return <div className={s.error}>Error loading posts</div>;

  const postFromCache = posts?.find((p) => p.id === postId);

  if (!postFromCache) {
    return (
      <div className={s.error}>
        <h3>Post not found</h3>
        <p>The post you're looking for doesn't exist.</p>
        <Link to="/posts" className={s.backLink}>
          ← Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <div className={s.post}>
      <h1 className={s.title}>{postFromCache.title}</h1>
      <div className={s.content}>{postFromCache.content}</div>
      <Link to="/posts" className={s.backLink}>
        ← Back to all posts
      </Link>
    </div>
  );
}

export default PostCard;
