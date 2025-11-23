import { Link } from "react-router";
import s from "./Header.module.css";

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link to="/" className={s.logo}>
          <span className={s.nutIcon}>🐿️</span>
          Squirrel Blog
        </Link>
      </nav>
    </header>
  );
};
