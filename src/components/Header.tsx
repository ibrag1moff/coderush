"use client";

import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaInfo } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  return (
    <header className="border-b border-neutral-800 bg-neutral-900 py-6">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-semibold tracking-tight text-neutral-100 hover:text-indigo-400 transition"
        >
          CodeRush 1.0
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {isLoggedIn && user ? (
            <>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-neutral-400 hover:text-indigo-400 transition"
              >
                <FiLogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Avatar */}
              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white"
              >
                {user.displayName?.charAt(0).toUpperCase() ?? "U"}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/about"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 hover:text-indigo-400 hover:bg-neutral-800 transition"
              >
                <FaInfo size={17} />
              </Link>

              <Link
                href="/login"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 hover:text-indigo-400 hover:bg-neutral-800 transition"
              >
                <FiUser size={20} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
