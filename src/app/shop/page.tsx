"use client";

import { useState } from "react";
import Link from "next/link";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

export default function ShopPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f8f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#d9cdbf] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-light italic text-[#2c1a12]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="font-semibold text-[#d4a574]">your</span>Shop
          </Link>
          <div className="flex items-center gap-4">
            <span
              className="text-sm font-light tracking-widest text-[#7b6a59] uppercase"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Welcome
            </span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8956a] flex items-center justify-center text-xs font-medium text-[#1a0f0a]">
              U
            </div>
          </div>
        </div>
      </header>

      {/* States bar */}
      <section className="border-b border-[#d9cdbf] bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p
            className="mb-3 text-xs font-light tracking-widest text-[#7b6a59] uppercase"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Shop by State
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {states.map((state) => (
              <button
                key={state}
                onClick={() => setSelected(state === selected ? null : state)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-light tracking-wide transition-all duration-300 ${
                  selected === state
                    ? "border-[#d4a574] bg-[#2c1a12] text-[#e9dfd4] shadow-md"
                    : "border-[#d9cdbf] bg-[#fbf9f6] text-[#7b6a59] hover:border-[#d4a574] hover:text-[#2c1a12]"
                }`}
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Shop content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-2xl font-light italic text-[#2c1a12] sm:text-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {selected ? (
              <>
                Artisans from{" "}
                <span className="font-semibold text-[#d4a574]">{selected}</span>
              </>
            ) : (
              <>
                All{" "}
                <span className="font-semibold text-[#d4a574]">Artisans</span>
              </>
            )}
          </h2>
          <span
            className="text-sm font-light tracking-widest text-[#b0a08f]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {selected ? "Filtered" : "28 States"}
          </span>
        </div>

        {/* Placeholder grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-[#d9cdbf] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#f5efe7] to-[#e9dfd4]" />
              <div className="p-5">
                <div className="mb-2 h-4 w-2/3 rounded bg-[#f5efe7]" />
                <div className="mb-3 h-3 w-1/2 rounded bg-[#f5efe7]" />
                <div className="flex items-center justify-between">
                  <div className="h-5 w-16 rounded bg-[#f5efe7]" />
                  <div className="h-8 w-20 rounded-full bg-gradient-to-r from-[#d4a574] to-[#b8956a]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
