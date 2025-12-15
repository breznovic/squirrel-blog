import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import s from "./AddPostPage.module.css";
import { useCreatePostMutation } from "../../services/postsApi";
import { showToast } from "../../store/features/toasts/toastsSlice";
import PostForm from "../PostForm/PostForm";

function AddPostPage() {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: {
    title: string;
    content: string;
    category: string;
    imageUrl: string;
    thumbnailUrl: string;
  }) => {
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

    setIsSubmitting(true);

    try {
      const newPost = await createPost({
        title: values.title,
        content: values.content,
        category: values.category,
        image_url: values.imageUrl || undefined,
        thumbnail_url: values.thumbnailUrl || undefined,
      }).unwrap();

      dispatch(
        showToast({
          type: "success",
          message: "Post created successfully!",
        })
      );

      navigate(`/posts/${newPost.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      dispatch(
        showToast({
          type: "error",
          message: "Failed to create post. Please try again.",
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1 className={s.title}>✨ Create a New Post</h1>
        <p className={s.subtitle}>
          Share your forest adventures with the world
        </p>
      </div>

      <div className={s.content}>
        <PostForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting || isLoading}
        />
      </div>
    </div>
  );
}

export default AddPostPage;
