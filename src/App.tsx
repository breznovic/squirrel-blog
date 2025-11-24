import { Link } from "react-router";
import s from "./App.module.css";

function App() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>🌲 Welcome to Squirrel Blog!</h1>
      <p className={s.subtitle}>
        Step into my forest home where I share the latest woodland news,
        seasonal updates, and stories from beneath the canopy.
      </p>

      <div className={s.block}>
        <p>Ready to explore the forest life?</p>
        <Link to="/posts">
          <button className={s.exploreButton}>Start Exploring →</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
