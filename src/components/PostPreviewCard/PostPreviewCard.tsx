import { Link } from "react-router";
import type { Post } from "../../services/postsApi";
import s from "./PostPreviewCard.module.css";

type Props = {
  post: Post;
};

function PostPreviewCard({ post }: Props) {
  const { title, content, published_at, id, category } = post;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Unknown date"
      : date.toLocaleDateString("en-EN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  };

  const getCategoryDisplayName = (categoryKey: string) => {
    const categories: Record<string, string> = {
      nature: "Nature",
      adventure: "Adventure",
      food: "Food",
      friends: "Friends",
      winter: "Winter",
      spring: "Spring",
      summer: "Summer",
      autumn: "Autumn",
    };
    return categories[categoryKey] || categoryKey;
  };

  return (
    <div className={s.post}>
      <div className={s.data}>
        <h3 className={s.title}>{title}</h3>
        <span className={s.date}>{formatDate(published_at)}</span>
      </div>

      <p className={s.content}>{content}</p>
      <div className={s.container}>
        <Link to={`/posts/${id}`} state={{ post }} className={s.button}>
          See post content
        </Link>
        <div className={`${s.categoryBadge} ${s[`category-${category}`]}`}>
          {getCategoryDisplayName(category)}
        </div>
      </div>
    </div>
  );
}

export default PostPreviewCard;
