const links = ["Fabrics", "Tailors", "How It Works", "Reviews"];

export default function Footer() {
  return (
    <footer
      aria-label="Footer"
      className="rounded-2xl border border-[#d4a574]/20 bg-gradient-to-b from-white to-[#fbf9f6] p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p
            className="text-lg font-light italic text-[#1f1a17] sm:text-xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="font-semibold text-[#d4a574]">your</span>Shop
          </p>
          <p
            className="max-w-xs text-sm font-light leading-relaxed text-[#7b6a59]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Custom tailoring made simple. Select fabrics, connect with master tailors, and get bespoke suits & sarees delivered to your door.
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-light tracking-wider text-[#7b6a59] transition-colors hover:text-[#d4a574]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-[#d4a574]/20 pt-4 text-xs text-[#7b6a59] sm:flex-row sm:items-center sm:justify-between">
        <p style={{ fontFamily: "'Jost', sans-serif" }}>
          © {new Date().getFullYear()} yourShop. All rights reserved.
        </p>
        <a
          href="https://github.com/Rishi12318/Shoppers"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-[#d4a574]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
