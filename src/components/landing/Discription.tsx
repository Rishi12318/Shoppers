"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    template: "https://i.pinimg.com/736x/58/39/19/583919eb72f317c39d1aee9546ab84c8.jpg",
    images: [
      { src: "https://i.pinimg.com/736x/f2/bf/67/f2bf677392896370007c54e4590e3fee.jpg", alt: "Style 1", className: "absolute top-[8%] left-[8%] h-[40%] w-[40%] rounded-lg object-cover shadow-lg" },
      { src: "https://i.pinimg.com/736x/92/da/f3/92daf33d54e400a1ae69e163159d97f0.jpg", alt: "Style 2", className: "absolute top-[8%] right-[8%] h-[40%] w-[40%] rounded-lg object-cover shadow-lg" },
      { src: "https://i.pinimg.com/736x/2a/51/69/2a51693b62d85882e8e0ed0f520023e8.jpg", alt: "Style 3", className: "absolute bottom-[8%] left-[20%] h-[40%] w-[55%] rounded-lg object-cover shadow-lg" },
    ],
  },
  {
    template: "https://i.pinimg.com/736x/a0/42/e9/a042e96d214e2e46dc175f28e60f1aa3.jpg",
    images: [
      { src: "https://i.pinimg.com/736x/45/3b/1d/453b1de576a963c08ecab1a1dac73680.jpg", alt: "Style 4", className: "absolute top-[8%] left-[8%] h-[40%] w-[40%] rounded-lg object-cover shadow-lg" },
      { src: "https://i.pinimg.com/736x/fa/92/80/fa9280ab9714371e9cce53390473a66a.jpg", alt: "Style 5", className: "absolute top-[8%] right-[8%] h-[40%] w-[40%] rounded-lg object-cover shadow-lg" },
      { src: "https://i.pinimg.com/736x/f6/1e/c6/f61ec6aeb0eadf55bd4d47a355996b9a.jpg", alt: "Style 6", className: "absolute bottom-[8%] left-[20%] h-[40%] w-[55%] rounded-lg object-cover shadow-lg" },
    ],
  },
];

export default function Discription() {
  const [isOpen, setIsOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [isOpen]);

  return (
    <section
      aria-label="About Platform Description Section"
      className="relative flex h-screen w-full items-center justify-center bg-[#2c1a12]"
    >
      <div className="relative mx-auto h-[90vh] w-[95vw] max-w-7xl">
        {/* Cupboard */}
        <div className="relative flex h-full w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#322017] via-[#2c1a12] to-[#24160f] shadow-2xl">
        {/* Left door */}
        <div
          className={`absolute top-0 left-0 z-40 h-full w-1/2 origin-left bg-gradient-to-r from-[#3d261a] via-[#2c1a12] to-[#1a0f0a] transition-transform duration-1000 ease-in-out ${
            isOpen ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h2
                className="text-3xl font-light italic text-[#e9dfd4] sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Why{" "}
                <span className="font-semibold text-[#d4a574]">your</span>Shop?
              </h2>
            </div>
          </div>
          {/* Door handle */}
          <div className="absolute top-1/2 right-4 h-12 w-1 -translate-y-1/2 rounded-full bg-[#d4a574]/60" />
        </div>

        {/* Right door */}
        <div
          className={`absolute top-0 right-0 z-40 h-full w-1/2 origin-right bg-gradient-to-l from-[#3d261a] via-[#2c1a12] to-[#1a0f0a] transition-transform duration-1000 ease-in-out ${
            isOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p
                className="text-sm font-light tracking-widest text-[#c4a882] uppercase"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Open to explore
              </p>
            </div>
          </div>
          {/* Door handle */}
          <div className="absolute top-1/2 left-4 h-12 w-1 -translate-y-1/2 rounded-full bg-[#d4a574]/60" />
        </div>

        {/* Golden lock button - center */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="absolute left-1/2 top-1/2 z-50 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8956a] shadow-lg transition-transform hover:scale-110"
            aria-label="Open cupboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#1a0f0a]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </button>
        )}

        {/* Inner content - revealed when doors open */}
        <div
          className={`relative z-10 flex h-full w-full transition-opacity duration-1000 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Left panel */}
          <div className="flex flex-1 flex-col items-center justify-center p-8 sm:p-12 lg:p-16">
            {/* Accent line */}
            <div className="mb-4 h-px w-12 bg-[#d4a574]/60" />
            
            <h2
              className="mb-4 text-center text-3xl font-light italic text-[#e9dfd4] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Why{" "}
              <span className="font-semibold text-[#d4a574]">your</span>Shop?
            </h2>

            {/* Accent line */}
            <div className="mb-6 h-px w-12 bg-[#d4a574]/60" />

            <p
              className="mb-10 max-w-md text-center text-sm font-light leading-relaxed text-[#c4a882] sm:text-base"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Select premium fabrics, connect directly with expert tailors to discuss custom stitching for your dream suit or saree, and have bespoke fashion delivered straight to your door.
            </p>

            <div className="grid w-full max-w-md grid-cols-2 gap-4">
              {[
                { title: "Master Tailors", desc: "Consult & chat with experts." },
                { title: "Fabric Selection", desc: "Choose premium materials." },
                { title: "Custom Stitching", desc: "Suits, sarees & tailored fits." },
                { title: "Doorstep Delivery", desc: "Stitched apparel at your door." },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-[#c8a495]/25 bg-[#2c1a12]/45 p-4 backdrop-blur-sm transition-colors hover:bg-[#2c1a12]/60"
                >
                  <h3
                    className="text-sm font-medium text-[#e9dfd4]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="mt-1 text-xs font-light text-[#c4a882]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel - carousel */}
          <div className="relative flex flex-1 items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="relative h-full w-full">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    i === slideIndex
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0"
                  }`}
                >
                  <img
                    src={slide.template}
                    alt="Collage template"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                  {slide.images.map((img, j) => (
                    <img
                      key={j}
                      src={img.src}
                      alt={img.alt}
                      className={img.className}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === slideIndex
                      ? "w-8 bg-[#d4a574]"
                      : "w-2 bg-[#e9dfd4]/30"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
