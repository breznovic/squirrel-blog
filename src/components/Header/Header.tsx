import { Link, useLocation } from "react-router";
import s from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  clearSearchQuery,
  setSearchQuery,
} from "../../store/features/search/searchSlice";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export const Header = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const location = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchQuery());
  };

  const showSearch = location.pathname === "/posts";

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link to="/" className={s.logo}>
          <span className={s.nutIcon}>🐿️</span>
          Squirrel Blog
        </Link>
        {showSearch && (
          <div className={s.searchContainer}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={s.searchInput}
            />
            {searchQuery && (
              <button onClick={handleClearSearch} className={s.clearButton}>
                ✕
              </button>
            )}
          </div>
        )}
        <ThemeToggle />
      </nav>
    </header>
  );
};
