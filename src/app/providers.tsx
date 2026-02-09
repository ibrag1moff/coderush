"use client";
import { ReactNode } from "react";
import TypingGameProvider from "@/context/typingGameContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { AuthListener } from "@/components/AuthListener";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CookiesProvider>
      <TypingGameProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
        <Provider store={store}>
          <AuthListener />
          {children}
        </Provider>
      </TypingGameProvider>
    </CookiesProvider>
  );
}
