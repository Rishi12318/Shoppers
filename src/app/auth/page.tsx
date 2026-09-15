"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Registration failed");
          setLoading(false);
          return;
        }

        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) {
          setError("Account created. Please sign in.");
          setMode("signin");
          setLoading(false);
          return;
        }

        router.push("/shop");
      } else {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Login failed");
          setLoading(false);
          return;
        }

        router.push("/shop");
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f5f1] px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light tracking-widest text-[#7b6a59] uppercase transition-colors hover:text-[#d4a574]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <div className="rounded-2xl border border-[#d9cdbf] bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <h1
              className="text-3xl font-light italic text-[#2c1a12] sm:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Welcome to{" "}
              <span className="font-semibold text-[#d4a574]">your</span>Shop
            </h1>
            <p
              className="mt-2 text-sm font-light tracking-widest text-[#7b6a59] uppercase"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {mode === "signin" ? "Sign in to continue" : "Create your account"}
            </p>
          </div>

          <div className="mb-8 flex rounded-full border border-[#d9cdbf] bg-[#fbf9f6] p-1">
            <button
              onClick={() => { setMode("signin"); setError(""); }}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                mode === "signin"
                  ? "bg-[#2c1a12] text-[#e9dfd4] shadow-md"
                  : "text-[#7b6a59] hover:text-[#2c1a12]"
              }`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); }}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                mode === "signup"
                  ? "bg-[#2c1a12] text-[#e9dfd4] shadow-md"
                  : "text-[#7b6a59] hover:text-[#2c1a12]"
              }`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label className="mb-1.5 block text-xs font-light tracking-widest text-[#7b6a59] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="h-12 w-full rounded-lg border border-[#d9cdbf] bg-[#fbf9f6] px-4 text-sm text-[#2c1a12] placeholder:text-[#b0a08f] transition-colors focus:border-[#d4a574] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-light tracking-widest text-[#7b6a59] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12 w-full rounded-lg border border-[#d9cdbf] bg-[#fbf9f6] px-4 text-sm text-[#2c1a12] placeholder:text-[#b0a08f] transition-colors focus:border-[#d4a574] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-light tracking-widest text-[#7b6a59] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                className="h-12 w-full rounded-lg border border-[#d9cdbf] bg-[#fbf9f6] px-4 text-sm text-[#2c1a12] placeholder:text-[#b0a08f] transition-colors focus:border-[#d4a574] focus:outline-none"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="mb-1.5 block text-xs font-light tracking-widest text-[#7b6a59] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  className="h-12 w-full rounded-lg border border-[#d9cdbf] bg-[#fbf9f6] px-4 text-sm text-[#2c1a12] placeholder:text-[#b0a08f] transition-colors focus:border-[#d4a574] focus:outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-12 w-full rounded-lg bg-gradient-to-r from-[#d4a574] to-[#b8956a] text-sm font-medium tracking-widest text-[#1a0f0a] uppercase transition-all duration-300 hover:shadow-lg hover:shadow-[#d4a574]/25 disabled:opacity-50"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
