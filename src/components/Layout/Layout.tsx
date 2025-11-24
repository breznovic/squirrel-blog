import { Outlet } from "react-router";

import styles from "./Layout.module.css";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { clearSearchQuery } from "../../store/features/search/searchSlice";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

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
