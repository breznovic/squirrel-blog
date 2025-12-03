import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme") as Theme;
  if (savedTheme) {
    return savedTheme;
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};

const initialState: Theme = getInitialTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    },
    setTheme: (_, action: PayloadAction<Theme>) => {
      localStorage.setItem("theme", action.payload);
      return action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
