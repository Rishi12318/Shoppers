"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const videos = [
  "https://v1.pinimg.com/videos/mc/720p/15/9b/c8/159bc891431a046ca81f68e57527d41c.mp4",
  "https://v1.pinimg.com/videos/iht/expMp4/bd/29/8b/bd298bf9cad8197ef40bbc36bf8f5e8e_720w.mp4",
  "https://v1.pinimg.com/videos/iht/expMp4/51/f7/80/51f780acbfbe66275c6a0c5d709c7d9b_720w.mp4",
];

const durations = [4, 0, 11];

export default function HeroSection() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    videos.forEach((_, i) => {
      const video = videoRefs.current[i];
      if (!video) return;

      if (durations[i] > 0) {
        const id = setInterval(() => {
          if (video.currentTime >= durations[i]) {
            video.currentTime = 0;
            video.play();
          }
        }, 100);
        intervals.push(id);
      }
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % videos.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {videos.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            autoPlay
            muted
            loop
            playsInline
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            src={src}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          {/* Accent line */}
          <div className="mb-6 h-px w-16 bg-[#d4a574]/60 sm:w-24" />
          
          {/* Main heading - luxury serif */}
          <h1
            className="text-center text-5xl font-light italic tracking-wide text-white sm:text-7xl lg:text-8xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            bespoke{" "}
            <span className="font-semibold text-[#d4a574]">tailoring</span>{" "}
            at your door
          </h1>

          {/* Accent line */}
          <div className="mt-6 h-px w-16 bg-[#d4a574]/60 sm:w-24" />

          {/* Supporting text - clean sans-serif */}
          <p
            className="mt-8 max-w-md text-center text-sm font-light tracking-widest text-white/70 uppercase sm:text-base"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Select fabrics • Choose master tailors • Custom suits & sarees delivered
          </p>

          <Link
            href="/auth"
            className="pointer-events-auto mt-10 inline-block rounded-full bg-gradient-to-r from-[#d4a574] to-[#b8956a] px-10 py-3 text-sm font-medium tracking-widest text-[#1a0f0a] uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#d4a574]/25"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
