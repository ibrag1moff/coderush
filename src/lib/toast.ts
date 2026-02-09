import { toast, ToastOptions } from "react-toastify";

const baseOptions: ToastOptions = {
  className:
    "bg-neutral-900 border border-neutral-700 text-neutral-100 text-sm rounded-lg flex items-center gap-2",
};

export const notify = {
  success: (message: string) =>
    toast.success(message, {
      ...baseOptions,
      icon: "✅" as any,
    }),

  error: (message: string) =>
    toast.error(message, {
      ...baseOptions,
      icon: "❌" as any,
    }),

  info: (message: string) =>
    toast(message, {
      ...baseOptions,
      icon: "ℹ️" as any,
    }),

  loading: (message: string) =>
    toast.loading(message, {
      ...baseOptions,
    }),
};
