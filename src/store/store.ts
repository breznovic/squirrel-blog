import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from "../services/postsApi";
import searchReducer from "./features/search/searchSlice";
import themeReducer from "./features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    search: searchReducer,
    theme: themeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
