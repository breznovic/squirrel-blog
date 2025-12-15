import { Link, useLocation, useNavigate, useParams } from "react-router";
import {
  useDeletePostMutation,
  useGetBlogPostsQuery,
} from "../../services/postsApi";
import s from "./PostCard.module.css";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/features/toasts/toastsSlice";
import { useState } from "react";

function PostCard() {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const {
    data: paginatedData,
    isLoading,
    error,
  } = useGetBlogPostsQuery({ sort: "newest" });
  const posts = paginatedData?.results || [];

  const postIdFromState = state?.post?.id;
  const postIdFromParams = id ? Number(id) : NaN;
  const postId = postIdFromState || postIdFromParams;

  const [deletePost] = useDeletePostMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const postFromState = state?.post;
  const postFromCache = posts.find((p) => p.id === postId);
  const post = postFromState || postFromCache;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleteModalOpen(false);

    try {
      await deletePost(postId).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: "Post deleted successfully!",
        })
      );
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
      dispatch(
        showToast({
          type: "error",
          message: "Failed to delete post. Please try again.",
        })
      );
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  if (isLoading) return <div className={s.loading}>Loading...</div>;
  if (error) return <div className={s.error}>Error loading posts</div>;
  if (!post) {
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
      <h1 className={s.title}>{post.title}</h1>
      <div className={s.content}>{post.content}</div>
      <div className={s.actions}>
        <Link to="/posts" className={s.backLink}>
          ← Back to all posts
        </Link>
        <div className={s.editDelete}>
          <Link to={`/posts/${postId}/edit`} className={s.editButton}>
            ✏️ Edit Post
          </Link>
          <button onClick={handleDelete} className={s.deleteButton}>
            🗑️ Delete Post
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <div className={s.modalOverlay} onClick={cancelDelete}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={s.modalTitle}>Confirm Deletion</h3>
            <p className={s.modalText}>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className={s.modalActions}>
              <button onClick={cancelDelete} className={s.modalCancelButton}>
                Cancel
              </button>
              <button onClick={confirmDelete} className={s.modalConfirmButton}>
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
