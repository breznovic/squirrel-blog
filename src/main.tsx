import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Layout from "./components/Layout/Layout";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import PostsList from "./components/PostsList/PostsList";
import PostCard from "./components/PostCard/PostCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "posts", element: <PostsList /> },
      { path: "/posts/:id", element: <PostCard /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
