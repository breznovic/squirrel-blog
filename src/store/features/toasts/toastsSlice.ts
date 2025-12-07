import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  createdAt: number;
}

interface ToastsState {
  items: Toast[];
}

const initialState: ToastsState = {
  items: [],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<Omit<Toast, "id" | "createdAt">>
    ) => {
      const toast: Toast = {
        id: uuidv4(),
        createdAt: Date.now(),
        ...action.payload,
      };
      state.items.push(toast);
    },
    hideToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.items = [];
    },
  },
});

export const { showToast, hideToast, clearToasts } = toastsSlice.actions;
export default toastsSlice.reducer;
