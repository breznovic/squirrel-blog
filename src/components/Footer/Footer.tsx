import s from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.content}>
        <p className={s.copyright}>
          © {new Date().getFullYear()} <span className={s.squirrelText}>Squirrel Blog</span>. 
          All nuts reserved 🐿️
        </p>
      </div>
    </footer>
  );
};

