"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbf9f6] px-4">
      <div className="text-center">
        <h1
          className="text-4xl font-light italic text-[#2c1a12]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Something went <span className="font-semibold text-[#d4a574]">wrong</span>
        </h1>
        <p
          className="mt-3 text-sm text-[#7b6a59]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-full border border-[#2c1a12] bg-[#2c1a12] px-6 py-2.5 text-sm font-light tracking-widest text-[#e9dfd4] uppercase transition-all hover:bg-[#d4a574] hover:text-[#1a0f0a]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
