import { useState, useMemo, useEffect } from "react";
import s from "./PostForm.module.css";

type PostFormValues = {
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  thumbnailUrl: string;
};

type Props = {
  onSubmit: (values: PostFormValues) => void;
  initialValues?: PostFormValues;
  isSubmitting?: boolean;
  onFormChange?: () => void;
  submitButtonText?: string;
};

function PostForm({
  onFormChange,
  onSubmit,
  initialValues,
  isSubmitting = false,
  submitButtonText = "Create Post",
}: Props) {
  const initialFormValues = useMemo(
    () => ({
      title: initialValues?.title || "",
      content: initialValues?.content || "",
      category: initialValues?.category || "nature",
      imageUrl: initialValues?.imageUrl || "",
      thumbnailUrl: initialValues?.thumbnailUrl || "",
    }),
    [initialValues]
  );

  const [formValues, setFormValues] =
    useState<PostFormValues>(initialFormValues);

  const imagePreview = formValues.imageUrl || null;
  const thumbnailPreview = formValues.thumbnailUrl || null;

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialFormValues);
    }
  }, [initialValues, initialFormValues]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
    if (onFormChange) {
      onFormChange();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.formGroup}>
        <label htmlFor="title" className={s.label}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className={s.input}
          placeholder="Enter post title"
          required
          disabled={isSubmitting}
        />
        <small className={s.helperText}>Minimum 5 characters</small>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="content" className={s.label}>
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={formValues.content}
          onChange={handleChange}
          className={s.textarea}
          placeholder="Write your post content here..."
          rows={8}
          required
          disabled={isSubmitting}
        />
        <small className={s.helperText}>Minimum 20 characters</small>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="category" className={s.label}>
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formValues.category}
          onChange={handleChange}
          className={s.select}
          disabled={isSubmitting}
        >
          <option value="nature">Nature</option>
          <option value="adventure">Adventure</option>
          <option value="food">Food</option>
          <option value="friends">Friends</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
        </select>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="imageUrl" className={s.label}>
          Main Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formValues.imageUrl}
          onChange={handleChange}
          className={s.input}
          placeholder="https://example.com/image.jpg"
          disabled={isSubmitting}
        />
        {imagePreview && (
          <div className={s.imagePreview}>
            <img src={imagePreview} alt="Preview" className={s.previewImage} />
          </div>
        )}
      </div>

      <div className={s.formGroup}>
        <label htmlFor="thumbnailUrl" className={s.label}>
          Thumbnail URL
        </label>
        <input
          type="url"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={formValues.thumbnailUrl}
          onChange={handleChange}
          className={s.input}
          placeholder="https://example.com/thumbnail.jpg"
          disabled={isSubmitting}
        />
        {thumbnailPreview && (
          <div className={s.imagePreview}>
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className={s.previewImage}
            />
          </div>
        )}
      </div>

      <div className={s.formActions}>
        <button
          type="button"
          onClick={handleReset}
          className={s.resetButton}
          disabled={isSubmitting}
        >
          Reset
        </button>
        <button
          type="submit"
          className={s.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? submitButtonText.includes("Update")
              ? "Updating..."
              : "Creating..."
            : submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
