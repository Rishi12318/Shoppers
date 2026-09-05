import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbf9f6] px-4">
      <div className="text-center">
        <p
          className="text-7xl font-bold text-[#d4a574]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          404
        </p>
        <h1
          className="mt-4 text-3xl font-light italic text-[#2c1a12]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Page not <span className="font-semibold text-[#d4a574]">found</span>
        </h1>
        <p
          className="mt-3 text-sm text-[#7b6a59]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full border border-[#2c1a12] bg-[#2c1a12] px-6 py-2.5 text-sm font-light tracking-widest text-[#e9dfd4] uppercase transition-all hover:bg-[#d4a574] hover:text-[#1a0f0a]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
