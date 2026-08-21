"use client";

const VIDEO_URL =
  "https://v1.pinimg.com/videos/iht/expMp4/bd/29/8b/bd298bf9cad8197ef40bbc36bf8f5e8e_720w.mp4";

export default function VideoShowcase() {
  return (
    <section
      aria-label="Video Showcase"
      className="animate-fade-in relative overflow-hidden rounded-2xl border border-[#d9cdbf] bg-white shadow-sm"
    >
      <video
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
