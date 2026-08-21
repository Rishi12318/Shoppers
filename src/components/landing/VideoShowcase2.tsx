"use client";

import { useRef, useEffect } from "react";

const VIDEO_URL =
  "https://v1.pinimg.com/videos/iht/expMp4/51/f7/80/51f780acbfbe66275c6a0c5d709c7d9b_720w.mp4";

export default function VideoShowcase2() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 11) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section
      aria-label="Video Showcase 2"
      className="animate-fade-in-delay relative overflow-hidden rounded-2xl border border-[#d9cdbf] bg-white shadow-sm"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[500px]"
        src={VIDEO_URL}
      />
    </section>
  );
}
