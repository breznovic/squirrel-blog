import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import s from "./EditPostPage.module.css";
import {
  useGetBlogPostsQuery,
  useUpdatePostMutation,
} from "../../services/postsApi";
import { showToast } from "../../store/features/toasts/toastsSlice";
import PostForm from "../PostForm/PostForm";

function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number(id) : NaN;

  const { data: paginatedData, isLoading: isLoadingPosts } =
    useGetBlogPostsQuery({
      sort: "newest",
    });
  const posts = paginatedData?.results || [];

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const postToEdit = posts.find((post) => post.id === postId);

  useEffect(() => {
    if (!isLoadingPosts && !postToEdit) {
      dispatch(
        showToast({
          type: "error",
          message: "Post not found",
        })
      );
      navigate("/posts");
    }
  }, [isLoadingPosts, postToEdit, dispatch, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSubmit = async (values: {
    title: string;
    content: string;
    category: string;
    imageUrl: string;
    thumbnailUrl: string;
  }) => {
    if (!postToEdit) return;

    if (values.title.length < 5) {
      dispatch(
        showToast({
          type: "error",
          message: "Title must be at least 5 characters long",
        })
      );
      return;
    }

    if (values.content.length < 20) {
      dispatch(
        showToast({
          type: "error",
          message: "Content must be at least 20 characters long",
        })
      );
      return;
    }

    try {
      await updatePost({
        id: postId,
        title: values.title,
        content: values.content,
        category: values.category,
        image_url: values.imageUrl || undefined,
        thumbnail_url: values.thumbnailUrl || undefined,
      }).unwrap();

      dispatch(
        showToast({
          type: "success",
          message: "Post updated successfully!",
        })
      );

      setHasUnsavedChanges(false);
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      dispatch(
        showToast({
          type: "error",
          message: "Failed to update post. Please try again.",
        })
      );
    }
  };

  const handleFormChange = () => {
    setHasUnsavedChanges(true);
  };

  if (isLoadingPosts || !postToEdit) {
    return (
      <div className={s.loadingContainer}>
        <div className={s.loadingSpinner}></div>
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1 className={s.title}>✏️ Edit Post</h1>
        <p className={s.subtitle}>Update your forest story</p>
      </div>

      <div className={s.content}>
        <PostForm
          onSubmit={handleSubmit}
          initialValues={{
            title: postToEdit.title,
            content: postToEdit.content,
            category: postToEdit.category,
            imageUrl: postToEdit.image_url || "",
            thumbnailUrl: postToEdit.thumbnail_url || "",
          }}
          isSubmitting={isUpdating}
          onFormChange={handleFormChange}
          submitButtonText="Update Post"
        />

        {hasUnsavedChanges && (
          <div className={s.unsavedWarning}>
            ⚠️ You have unsaved changes. Are you sure you want to leave?
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPostPage;
