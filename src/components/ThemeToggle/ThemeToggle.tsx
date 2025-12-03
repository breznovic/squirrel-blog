import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toggleTheme } from "../../store/features/theme/themeSlice";
import s from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <button
      className={s.toggle}
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
