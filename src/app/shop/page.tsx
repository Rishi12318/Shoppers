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

const CDN = "https://cdn.shopify.com/s/files/1/0820/2987/1316/files";
const VIDEO_BASE = "https://astrea-venus.myshopify.com/cdn/shop/videos";
const HERO_VIDEO = `${VIDEO_BASE}/c/vp/98deb5efebaf431cb7190f79db01c87d/98deb5efebaf431cb7190f79db01c87d.HD-1080p-2.5Mbps-77913184.mp4?v=0`;
const HERO_VIDEO_POSTER = `${CDN}/preview_images/98deb5efebaf431cb7190f79db01c87d.thumbnail.0000000000_small.jpg`;
const WHYUS_VIDEO = `${VIDEO_BASE}/c/vp/813b18076c654b6696dec97bba622274/813b18076c654b6696dec97bba622274.HD-1080p-2.5Mbps-77971130.mp4?v=0`;
const WHYUS_VIDEO_POSTER = `${CDN}/preview_images/813b18076c654b6696dec97bba622274.thumbnail.0000000000_small.jpg`;

const whyUs = [
  { heading: "Customer first", desc: "We prioritize your satisfaction and ensure exceptional service at every step." },
  { heading: "Quality guaranteed", desc: "Every product is carefully crafted to meet the highest standards of excellence." },
  { heading: "Fast shipping", desc: "Get your order delivered quickly with our reliable shipping partners." },
];

const featuredProducts = [
  { title: "Premium Punjabi Suits", desc: "Authentic designs from Amritsar, crafted with love and tradition", cta: "Shop Suits", img: `${CDN}/download_18_3000a9c5-df7f-4b11-98cb-17db74195785.jpg` },
  { title: "Punjabi Jutti", desc: "Handcrafted jutti to complete your traditional look", cta: "Shop Jutti", img: `${CDN}/Twirl_groove_repeat_your_handcrafted_juttis_are_Navratri-ready_____DFRForAll___dfr_navratrifits_juttisfornavratri_womenjuttis_handcraftedfootwear_mojaris_customised_desi_juttis_kolhap.jpg` },
  { title: "Exquisite Phulkari Chunni", desc: "Vibrant embroidered chunnis showcasing Punjab's rich heritage", cta: "Shop Phulkari", img: `${CDN}/Phulkari.jpg` },
  { title: "Everything from Amritsar", desc: "Your one-stop destination for authentic Punjabi fashion", cta: "Explore All", img: `${CDN}/download_19_6dabf79c-8ac3-482c-bac2-f06fe6e96df7.jpg` },
];

const productGrid = [
  { title: "Phulkari Dupatta", price: "₹1,299", img: `${CDN}/Phulkari.jpg` },
  { title: "Punjabi Jutti Pair", price: "₹899", img: `${CDN}/Twirl_groove_repeat_your_handcrafted_juttis_are_Navratri-ready_____DFRForAll___dfr_navratrifits_juttisfornavratri_womenjuttis_handcraftedfootwear_mojaris_customised_desi_juttis_kolhap.jpg` },
  { title: "Anarkali Suit Set", price: "₹2,499", img: `${CDN}/Royal_Yellow_Festive_Suit_Set___Elegant_Ethnic_Wedding_Outfit.jpg` },
  { title: "Parandi Set", price: "₹599", img: `${CDN}/Punjabi_Bride_Parandi.jpg` },
  { title: "Chikankari Kurta", price: "₹1,799", img: `${CDN}/Burgundy_Georgette_Sharara_Suit__Pakistani_Indian_Ethnic_Wear_-_Etsy.jpg` },
  { title: "Sharara Suit", price: "₹2,199", img: `${CDN}/Pyoor_Farshi_Salwar_Suits__Make_a_Statement_This.jpg` },
  { title: "Patiala Salwar Set", price: "₹1,599", img: `${CDN}/New_look_bride_back_to_old_fashion.jpg` },
  { title: "Bridal Lehenga", price: "₹4,999", img: `${CDN}/download_18_3000a9c5-df7f-4b11-98cb-17db74195785.jpg` },
];

export default function ShopPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const productInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
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
      <section className="relative flex h-[70vh] min-h-[400px] items-end justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_VIDEO_POSTER}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#121212]/40" />
        <div className="relative z-10 w-full text-center pb-[72px] px-4">
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
            href="/collections/all"
            className="mt-8 inline-block rounded-full border border-white/80 bg-transparent px-8 py-3 text-sm font-light tracking-widest text-white uppercase transition-all duration-300 hover:bg-white hover:text-[#121212]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Shop All
          </a>
        </div>
      </section>

      {/* Collections - Split Showcase */}
      <section className="relative flex min-h-[500px] flex-col md:flex-row">
        {/* Left: Comparison Slider */}
        <div className="relative w-full md:w-1/2">
          <img
            src={`${CDN}/download_25.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex h-full items-center justify-center p-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img src={`${CDN}/Punjabi_Bride_Parandi.jpg`} alt="Before" className="aspect-[3/4] w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img src={`${CDN}/desiiii__3_da3767ad-3331-4449-84bc-9623f1330266.jpg`} alt="After" className="aspect-[3/4] w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img src={`${CDN}/beauty_of_being_a_women.jpg`} alt="Before" className="aspect-[3/4] w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img src={`${CDN}/Burgundy_Georgette_Sharara_Suit__Pakistani_Indian_Ethnic_Wear_-_Etsy.jpg`} alt="After" className="aspect-[3/4] w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Collections List */}
        <div className="relative w-full md:w-1/2">
          <img
            src={`${CDN}/download_25.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex h-full flex-col justify-center gap-4 p-8 md:p-12">
            <h2
              className="text-2xl font-bold text-[#2c1a12]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Our Collections
            </h2>
            <span
              className="text-3xl font-bold leading-none text-[#2c1a12] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              SUMMER COLLECTION
            </span>
            <span
              className="text-3xl font-bold leading-[0.8] tracking-tight text-[#2c1a12] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              WINTER COLLECTION
            </span>
            <span
              className="text-3xl font-bold leading-none tracking-tight text-[#2c1a12] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              CASUAL COLLECTION
            </span>
            <span
              className="text-3xl font-bold leading-[0.8] tracking-tight text-[#2c1a12] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              WEDDING COLLECTION
            </span>
            <a
              href="/collections/all"
              className="mt-4 text-sm font-light tracking-wide text-[#2c1a12] underline underline-offset-4 transition-colors hover:text-[#d4a574]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Shop now
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeProduct * 100}%)` }}>
            {featuredProducts.map((product, i) => (
              <div key={i} className="w-full shrink-0">
                <div className="relative h-[500px]">
                  <img src={product.img} alt={product.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h3
                      className="text-4xl font-bold sm:text-5xl lg:text-6xl"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {product.title}
                    </h3>
                    <p
                      className="mt-4 max-w-xl text-lg font-light text-white/90"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {product.desc}
                    </p>
                    <a
                      href={`/tailor?product=${encodeURIComponent(product.title)}`}
                      className="mt-8 inline-block rounded-full border border-white bg-white px-8 py-3 text-sm font-medium tracking-widest text-black uppercase transition-all duration-300 hover:bg-black hover:text-white"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {product.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => setActiveProduct((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black transition-all hover:bg-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveProduct((prev) => (prev + 1) % featuredProducts.length)}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black transition-all hover:bg-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {featuredProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveProduct(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeProduct ? "w-8 bg-white" : "w-2.5 bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-xl font-bold text-[#2c1a12]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {selected ? (
                <>From <span className="text-[#d4a574]">{selected}</span></>
              ) : (
                <>Featured collection</>
              )}
            </h2>
            <a
              href="/collections/all"
              className="text-sm font-light text-[#2c1a12] underline underline-offset-4 transition-colors hover:text-[#d4a574]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              View all
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {productGrid.map((product, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2c1a12]/0 transition-all duration-300 group-hover:bg-[#2c1a12]/10" />
                  <a
                    href={`/tailor?product=${encodeURIComponent(product.title)}`}
                    className="absolute bottom-3 left-3 right-3 rounded-full border border-white bg-white/90 py-2 text-center text-xs font-medium tracking-widest text-[#2c1a12] uppercase opacity-0 transition-all duration-300 hover:bg-[#2c1a12] hover:text-white group-hover:opacity-100"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    Buy Now
                  </a>
                </div>
                <div className="mt-2">
                  <h3
                    className="text-sm font-medium text-[#2c1a12]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {product.title}
                  </h3>
                  <p
                    className="mt-0.5 text-sm font-light text-[#7b6a59]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us - Slideshow */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={WHYUS_VIDEO_POSTER}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={WHYUS_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h2
            className="text-3xl font-light italic text-white sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Why us
          </h2>
          <a
            href="/collections/all"
            className="mt-6 inline-block rounded-full border border-white bg-white px-8 py-3 text-sm font-medium tracking-widest text-black uppercase transition-all duration-300 hover:bg-black hover:text-white"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Shop now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d9cdbf] bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h3
            className="text-2xl font-light italic text-[#2c1a12]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The <span className="font-semibold text-[#d4a574]">Amritsari&apos;s</span>
          </h3>
          <p
            className="mt-2 text-xs font-light tracking-widest text-[#7b6a59] uppercase"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Authentic Punjabi Fashion
          </p>
          <div className="mt-6 flex justify-center gap-6">
            {["Instagram", "Facebook", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs font-light tracking-widest text-[#7b6a59] uppercase transition-colors hover:text-[#2c1a12]"
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
