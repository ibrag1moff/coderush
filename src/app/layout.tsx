import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";
import "@/assets/styles/prismjs.scss";
import { ReactNode } from "react";
import TypingGameProvider from "../context/typingGameContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CodeRush",
  description: "CodeRush - a simple typing game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <TypingGameProvider>
        <body
          className={`${poppins.variable} antialiased bg-neutral-800 text-gray-100`}
        >
          {children}
        </body>
      </TypingGameProvider>
    </html>
  );
}
