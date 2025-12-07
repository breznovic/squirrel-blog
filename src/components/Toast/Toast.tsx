import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideToast } from "../../store/features/toasts/toastsSlice";
import s from "./Toast.module.css";

export type ToastProps = {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
};

const Toast = ({ id, type, message, duration = 5000 }: ToastProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideToast(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [id, dispatch, duration]);

  const handleClose = () => {
    dispatch(hideToast(id));
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "ℹ️";
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case "success":
        return s.success;
      case "error":
        return s.error;
      case "warning":
        return s.warning;
      case "info":
        return s.info;
      default:
        return s.info;
    }
  };

  return (
    <div className={`${s.toast} ${getTypeClass()}`} role="alert">
      <div className={s.icon}>{getIcon()}</div>
      <div className={s.message}>{message}</div>
      <div
        className={s.close}
        onClick={handleClose}
        aria-label="Close notification"
      >
        ✕
      </div>
    </div>
  );
};

export default Toast;
