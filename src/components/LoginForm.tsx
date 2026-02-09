"use client";
import { useAuth } from "@/hooks/useAuth";
import { GithubIcon } from "@/assets/icons/GithubIcon";
import { GoogleIcon } from "@/assets/icons/GoogleIcon";
import { FormEvent, useState } from "react";

export const LoginForm = () => {
  const {
    handleGoogleLogin,
    handleGithubLogin,
    handleLoginWithEmailAndPassword,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLoginWithEmailAndPassword(email, password);
  };

  return (
    <div className="flex mt-30 items-center justify-center bg-neutral-800">
      <div className="w-full max-w-sm rounded-xl border border-neutral-700 bg-neutral-900 p-6 shadow-lg">
        <h1 className="mb-1 text-xl font-semibold text-neutral-100">Sign in</h1>
        <p className="mb-6 text-sm text-neutral-400">
          Welcome back. Sign in to continue.
        </p>

        {/* OAuth buttons */}
        <div className="space-y-2">
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700 transition"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* GitHub */}
          <button
            onClick={handleGithubLogin}
            type="button"
            className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700 transition"
          >
            <GithubIcon />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-neutral-700" />
          <span className="text-xs text-neutral-500">OR</span>
          <div className="h-px flex-1 bg-neutral-700" />
        </div>

        {/* Email login */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:border-indigo-500 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:border-indigo-500 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-400">
          Don’t have an account?{" "}
          <a
            href="#"
            className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
