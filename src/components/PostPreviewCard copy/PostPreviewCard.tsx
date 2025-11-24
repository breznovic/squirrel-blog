import type { Post } from "../../services/postsApi";
import s from "./PostPreviewCard.module.css";

type Props = {
  post: Post;
};

function PostPreviewCard({ post }: Props) {
  const { title, content } = post;

  return (
    <div className={s.post}>
      <h3 className={s.title}>{title}</h3>
      <p className={s.content}>{content}</p>
    </div>
  );
}

export default PostPreviewCard;
