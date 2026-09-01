"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
];

const collections = [
  { name: "Summer Collection", link: "#summer" },
  { name: "Winter Collection", link: "#winter" },
  { name: "Casual Collection", link: "#casual" },
  { name: "Wedding Collection", link: "#wedding" },
];

const featuredProducts = [
  { title: "Premium Punjabi Suits", desc: "Authentic designs from Amritsar, crafted with love and tradition", cta: "Shop Suits", img: "https://i.pinimg.com/736x/58/39/19/583919eb72f317c39d1aee9546ab84c8.jpg" },
  { title: "Punjabi Jutti", desc: "Handcrafted jutti to complete your traditional look", cta: "Shop Jutti", img: "https://i.pinimg.com/736x/f2/bf/67/f2bf677392896370007c54e4590e3fee.jpg" },
  { title: "Exquisite Phulkari Chunni", desc: "Vibrant embroidered chunnis showcasing Punjab's rich heritage", cta: "Shop Phulkari", img: "https://i.pinimg.com/736x/92/da/f3/92daf33d54e400a1ae69e163159d97f0.jpg" },
  { title: "Everything from Amritsar", desc: "Your one-stop destination for authentic Punjabi fashion", cta: "Explore All", img: "https://i.pinimg.com/736x/2a/51/69/2a51693b62d85882e8e0ed0f520023e8.jpg" },
];

const productGrid = [
  { title: "Phulkari Dupatta", price: "₹1,299", img: "https://i.pinimg.com/736x/45/3b/1d/453b1de576a963c08ecab1a1dac73680.jpg" },
  { title: "Punjabi Jutti Pair", price: "₹899", img: "https://i.pinimg.com/736x/fa/92/80/fa9280ab9714371e9cce53390473a66a.jpg" },
  { title: "Anarkali Suit Set", price: "₹2,499", img: "https://i.pinimg.com/736x/f6/1e/c6/f61ec6aeb0eadf55bd4d47a355996b9a.jpg" },
  { title: "Parandi Set", price: "₹599", img: "https://i.pinimg.com/736x/a0/42/e9/a042e96d214e2e46dc175f28e60f1aa3.jpg" },
  { title: "Chikankari Kurta", price: "₹1,799", img: "https://i.pinimg.com/736x/58/39/19/583919eb72f317c39d1aee9546ab84c8.jpg" },
  { title: "Sharara Suit", price: "₹2,199", img: "https://i.pinimg.com/736x/f2/bf/67/f2bf677392896370007c54e4590e3fee.jpg" },
  { title: "Patiala Salwar Set", price: "₹1,599", img: "https://i.pinimg.com/736x/92/da/f3/92daf33d54e400a1ae69e163159d97f0.jpg" },
  { title: "Bridal Lehenga", price: "₹4,999", img: "https://i.pinimg.com/736x/2a/51/69/2a51693b62d85882e8e0ed0f520023e8.jpg" },
];

const whyUs = [
  { heading: "Customer first", desc: "We prioritize your satisfaction and ensure exceptional service at every step." },
  { heading: "Quality guaranteed", desc: "Every product is carefully crafted to meet the highest standards of excellence." },
  { heading: "Fast shipping", desc: "Get your order delivered quickly with our reliable shipping partners." },
];

export default function ShopPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const productInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    productInterval.current = id;
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#d9cdbf] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-light italic text-[#2c1a12]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The <span className="font-semibold text-[#d4a574]">Amritsari&apos;s</span>
          </Link>
          <div className="flex items-center gap-6">
            <span
              className="hidden text-xs font-light tracking-widest text-[#7b6a59] uppercase sm:block"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Aesthetics of Punjab
            </span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8956a] flex items-center justify-center text-xs font-medium text-[#1a0f0a]">
              U
            </div>
          </div>
        </div>
      </header>

      {/* States bar */}
      <section className="border-b border-[#d9cdbf] bg-[#fbf9f6] px-4 py-4 sm:px-6 lg:px-8">
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
                    : "border-[#d9cdbf] bg-white text-[#7b6a59] hover:border-[#d4a574] hover:text-[#2c1a12]"
                }`}
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero - The Amritsari's */}
      <section className="relative flex h-[70vh] min-h-[400px] items-center justify-center overflow-hidden bg-[#2c1a12]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c1a12]/80 via-[#2c1a12]/40 to-[#2c1a12]/80" />
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl font-light italic text-white sm:text-7xl lg:text-8xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The <span className="font-semibold text-[#d4a574]">Amritsari&apos;s</span>
          </h1>
          <p
            className="mt-4 text-sm font-light tracking-widest text-[#c4a882] uppercase sm:text-base"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Aesthetics of Punjab
          </p>
          <div className="mt-8 h-px w-16 mx-auto bg-[#d4a574]/60" />
          <a
            href="#products"
            className="mt-8 inline-block rounded-full border border-[#d4a574] px-8 py-3 text-sm font-light tracking-widest text-[#d4a574] uppercase transition-all duration-300 hover:bg-[#d4a574] hover:text-[#1a0f0a]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Shop All
          </a>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-[#fbf9f6] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-2 text-3xl font-light italic text-[#2c1a12] sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our <span className="font-semibold text-[#d4a574]">Collections</span>
          </h2>
          <div className="mb-10 h-px w-12 bg-[#d4a574]/60" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((col, i) => (
              <a
                key={col.name}
                href={col.link}
                className="group relative overflow-hidden rounded-2xl border border-[#d9cdbf] bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-[#d4a574]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2c1a12]/5 to-[#2c1a12]/0 transition-opacity group-hover:from-[#2c1a12]/10" />
                <span
                  className="relative text-lg font-light tracking-wide text-[#2c1a12] sm:text-xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {col.name}
                </span>
                <div className="relative mt-3 h-px w-8 bg-[#d4a574]/40 transition-all duration-300 group-hover:w-12 group-hover:bg-[#d4a574]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-2 text-3xl font-light italic text-[#2c1a12] sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Featured <span className="font-semibold text-[#d4a574]">Picks</span>
          </h2>
          <div className="mb-10 h-px w-12 bg-[#d4a574]/60" />

          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeProduct * 100}%)` }}>
              {featuredProducts.map((product, i) => (
                <div key={i} className="w-full shrink-0">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f5efe7]">
                      <img src={product.img} alt={product.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a12]/60 to-transparent" />
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-8">
                      <h3
                        className="text-2xl font-light italic text-[#2c1a12] sm:text-3xl"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {product.title}
                      </h3>
                      <p
                        className="mt-3 text-sm font-light leading-relaxed text-[#7b6a59]"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      >
                        {product.desc}
                      </p>
                      <a
                        href="#"
                        className="mt-6 inline-block self-start rounded-full bg-[#2c1a12] px-6 py-2.5 text-xs font-light tracking-widest text-[#e9dfd4] uppercase transition-all duration-300 hover:bg-[#d4a574] hover:text-[#1a0f0a]"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      >
                        {product.cta}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {featuredProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveProduct(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeProduct ? "w-8 bg-[#d4a574]" : "w-2 bg-[#d9cdbf]"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="bg-[#fbf9f6] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-2 text-3xl font-light italic text-[#2c1a12] sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {selected ? (
              <>From <span className="font-semibold text-[#d4a574]">{selected}</span></>
            ) : (
              <>All <span className="font-semibold text-[#d4a574]">Products</span></>
            )}
          </h2>
          <div className="mb-10 h-px w-12 bg-[#d4a574]/60" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productGrid.map((product, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-2xl border border-[#d9cdbf] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#d4a574]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f5efe7]">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a12]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-4">
                  <h3
                    className="text-sm font-medium text-[#2c1a12]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {product.title}
                  </h3>
                  <p
                    className="mt-1 text-xs font-light tracking-wider text-[#7b6a59]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {product.price}
                  </p>
                  <button
                    className="mt-3 w-full rounded-full border border-[#d9cdbf] py-2 text-xs font-light tracking-widest text-[#7b6a59] uppercase transition-all duration-300 hover:border-[#d4a574] hover:bg-[#2c1a12] hover:text-[#e9dfd4]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2
            className="mb-2 text-3xl font-light italic text-[#2c1a12] sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Why <span className="font-semibold text-[#d4a574]">Us</span>
          </h2>
          <div className="mx-auto mb-10 h-px w-12 bg-[#d4a574]/60" />

          <div className="grid gap-6 sm:grid-cols-3">
            {whyUs.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#d9cdbf] bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-[#d4a574]"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2c1a12] text-[#d4a574]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3
                  className="text-lg font-medium text-[#2c1a12]"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {item.heading}
                </h3>
                <p
                  className="mt-2 text-sm font-light leading-relaxed text-[#7b6a59]"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d9cdbf] bg-[#2c1a12] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h3
            className="text-2xl font-light italic text-[#e9dfd4]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The <span className="font-semibold text-[#d4a574]">Amritsari&apos;s</span>
          </h3>
          <p
            className="mt-2 text-xs font-light tracking-widest text-[#c4a882] uppercase"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Authentic Punjabi Fashion
          </p>
          <div className="mt-6 flex justify-center gap-6">
            {["Instagram", "Facebook", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs font-light tracking-widest text-[#c4a882] uppercase transition-colors hover:text-[#d4a574]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {social}
              </a>
            ))}
          </div>
          <p
            className="mt-8 text-xs font-light text-[#7b6a59]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            &copy; 2026 The Amritsari&apos;s. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
