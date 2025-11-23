import { useGetAllPostsQuery } from "./services/posts";
import s from "./App.module.css";

function App() {
  const { data: posts, error, isLoading } = useGetAllPostsQuery();

  return (
    <div className={s.container}>
      <h1 className={s.title}>🌲 Welcome to Squirrel Blog!</h1>
      <p className={s.subtitle}>
        Step into my forest home where I share the latest woodland news,
        seasonal updates, and stories from beneath the canopy.
      </p>

      {error ? (
        <div>Oh no, there was an error</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : posts ? (
        <div className={s.posts}>
          {posts.map((post) => (
            <div key={post.id} className={s.post}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className={s.block}>
        <p>Ready to explore the forest life?</p>
        <button className={s.exploreButton}>Start Exploring →</button>
      </div>
    </div>
  );
}

export default App;
