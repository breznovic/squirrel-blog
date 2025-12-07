import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from "../services/postsApi";
import searchReducer from "./features/search/searchSlice";
import themeReducer from "./features/theme/themeSlice";
import sortVisibilityReducer from "./features/sortVisibility/sortVisibilitySlice";
import toastsReducer from "./features/toasts/toastsSlice";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    search: searchReducer,
    theme: themeReducer,
    sortVisibility: sortVisibilityReducer,
    toasts: toastsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
