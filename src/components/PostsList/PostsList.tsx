import { useGetAllPostsQuery } from "../../services/postsApi";
import PostPreviewCard from "../PostPreviewCard/PostPreviewCard";
import s from "./PostsList.module.css";

const PostsList = () => {
  const { data: posts, error, isLoading } = useGetAllPostsQuery();

  return (
    <>
      {error ? (
        <div>Oh no, there was an error</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : posts ? (
        <div className={s.posts}>
          {posts.map((post) => (
            <PostPreviewCard key={post.id} post={post} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default PostsList;
