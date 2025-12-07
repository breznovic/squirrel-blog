import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Layout from "./components/Layout/Layout";
import PostCard from "./components/PostCard/PostCard";
import PostsList from "./components/PostsList/PostsList";
import "./index.css";
import { store } from "./store/store";
import ToastContainer from "./components/ToastContainer/ToastContainer";

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
    <ToastContainer />
  </Provider>
);
