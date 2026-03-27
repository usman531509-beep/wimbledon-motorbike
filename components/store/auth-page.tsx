"use client";

import Link from "next/link";
import { useState } from "react";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <img src="/logo-black.png" alt="Wimbledon Motorbike" className="h-10 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-[#dc2626]">
            Back to store
          </Link>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 inline-flex rounded-full bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "login" ? "bg-slate-900 text-white" : "text-slate-500"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "signup" ? "bg-[#dc2626] text-white" : "text-slate-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="font-heading text-3xl font-extrabold text-slate-950">
            {mode === "login" ? "Login" : "Create account"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "login"
              ? "Enter your details to access your account."
              : "Fill in the details below to create your account."}
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage(
                mode === "login"
                  ? "Demo login submitted."
                  : "Demo signup submitted.",
              );
            }}
          >
            {mode === "signup" ? (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Usman Ahmad"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#dc2626]"
                />
              </div>
            ) : null}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#dc2626]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#dc2626]"
              />
            </div>

            {mode === "signup" ? (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#dc2626]"
                />
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#dc2626]"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>

          {message ? (
            <div className="mt-4 rounded-2xl bg-[#fef2f2] px-4 py-3 text-sm text-[#166534]">
              {message}
            </div>
          ) : null}

          <p className="mt-6 text-center text-sm text-slate-500">
            {mode === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setMessage("");
              }}
              className="font-semibold text-[#dc2626]"
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
