"use client";

import { useRef, useEffect, useState } from "react";
import { Lottie } from "lottie-react";
import leavesAnimation from "../../../public/Leaves Flower.json";

const slides = [
  {
    video:
      "https://v1.pinimg.com/videos/iht/expMp4/b1/18/4f/b1184f47da1b22e8f29317e10b709eb7_720w.mp4",
    text: "Select your fabric & pick your favorite tailor",
  },
  {
    video:
      "https://v1.pinimg.com/videos/mc/720p/fd/fe/ca/fdfeca97b2831f9e386b1e648f13504c.mp4",
    text: "Chat directly with your tailor about your suit or saree requirements",
  },
  {
    video:
      "https://v1.pinimg.com/videos/mc/720p/14/61/a3/1461a360f6f04ccabc706580221a6f10.mp4",
    text: "Get your custom stitched outfit delivered straight to your door",
  },
];

export default function Working() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const boxVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="how-it-works"
      aria-label="How It Works Section"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Blurred background videos */}
      {slides.map((slide, i) => (
        <div
          key={`bg-${i}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el; }}
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none h-full w-full object-cover blur-md scale-110"
            src={slide.video}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/50" />

      {/* Glass box with clear video inside */}
      <div className="relative z-10 h-[60vh] w-[80vw] max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl sm:h-[65vh] sm:w-[70vw] lg:h-[70vh] lg:w-[60vw]">
        {/* Clear (not blurred) videos inside the box */}
        {slides.map((slide, i) => (
          <div
            key={`box-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={(el) => { boxVideoRefs.current[i] = el; }}
              autoPlay
              muted
              loop
              playsInline
              className="pointer-events-none h-full w-full object-cover"
              src={slide.video}
            />
          </div>
        ))}

        {/* Dark overlay inside box for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Lottie leaves on box corners */}
        <div className="pointer-events-none absolute top-3 left-3 z-20 w-20 opacity-70 sm:w-24 lg:w-28">
          <Lottie src={leavesAnimation} loop />
        </div>
        <div className="pointer-events-none absolute top-3 right-3 z-20 w-20 scale-x-[-1] opacity-70 sm:w-24 lg:w-28">
          <Lottie src={leavesAnimation} loop />
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 z-20 w-20 scale-y-[-1] opacity-70 sm:w-24 lg:w-28">
          <Lottie src={leavesAnimation} loop />
        </div>
        <div className="pointer-events-none absolute right-3 bottom-3 z-20 w-20 scale-[-1] opacity-70 sm:w-24 lg:w-28">
          <Lottie src={leavesAnimation} loop />
        </div>

        {/* Text inside the clear box */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {slides.map((slide, i) => (
            <h2
              key={i}
              className={`absolute flex items-center justify-center px-8 text-center text-3xl font-light italic text-white transition-all duration-1000 sm:text-4xl lg:text-5xl ${
                i === active
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {slide.text}
            </h2>
          ))}

          <div className="absolute bottom-8 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-10 bg-[#d4a574]" : "w-2 bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
