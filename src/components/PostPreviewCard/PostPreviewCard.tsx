import { Link } from "react-router";
import type { Post } from "../../services/postsApi";
import s from "./PostPreviewCard.module.css";

type Props = {
  post: Post;
};

function PostPreviewCard({ post }: Props) {
  const { title, content, id } = post;

  return (
    <div className={s.post}>
      <h3 className={s.title}>{title}</h3>
      <p className={s.content}>{content}</p>
      <Link to={`/posts/${id}`} state={{ post }} className={s.button}>
        See post content
      </Link>
    </div>
  );
}

export default PostPreviewCard;
