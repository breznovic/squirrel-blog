import { Outlet } from "react-router";

import styles from "./Layout.module.css";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchQuery } from "../../store/features/search/searchSlice";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import type { RootState } from "../../store/store";

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!location.pathname.startsWith("/posts")) {
      dispatch(clearSearchQuery());
    }
  }, [location.pathname, dispatch]);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
