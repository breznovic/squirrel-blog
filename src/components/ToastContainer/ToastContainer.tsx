import { useSelector } from "react-redux";
import Toast from "../Toast/Toast";
import s from "./ToastContainer.module.css";
import type { RootState } from "../../store/store";

const ToastContainer = () => {
  const toasts = useSelector((state: RootState) => state.toasts.items);

  return (
    <div className={s.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
