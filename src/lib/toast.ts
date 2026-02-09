import { toast, ToastOptions } from "react-toastify";

const baseOptions: ToastOptions = {
  className:
    "bg-neutral-900 border border-neutral-700 text-neutral-100 text-sm rounded-lg",
  bodyClassName: "flex items-center gap-2",
};

export const notify = {
  success: (message: string) =>
    toast.success(message, {
      ...baseOptions,
      icon: "✅",
    }),

  error: (message: string) =>
    toast.error(message, {
      ...baseOptions,
      icon: "❌",
    }),

  info: (message: string) =>
    toast(message, {
      ...baseOptions,
      icon: "ℹ️",
    }),

  loading: (message: string) =>
    toast.loading(message, {
      ...baseOptions,
    }),
};
