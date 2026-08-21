const reviews = [
  {
    name: "Aisha",
    location: "Mumbai",
    quote:
      "Selected a silk fabric and got my custom saree blouse stitched by an expert tailor. The fit was flawless!",
    rating: 5,
  },
  {
    name: "Marco",
    location: "Delhi",
    quote:
      "Chatting directly with the tailor made getting my three-piece suit customized so effortless.",
    rating: 5,
  },
  {
    name: "Priya",
    location: "Bangalore",
    quote:
      "I picked my fabric online and shared my measurements over chat. The stitched suit arrived right at my door!",
    rating: 5,
  },
];

export default function Review() {
  return (
    <section
      id="reviews"
      aria-label="Customer Reviews Section"
      className="rounded-2xl border border-[#d4a574]/20 bg-gradient-to-b from-[#fbf9f6] to-[#f8f5f1] p-6 shadow-sm sm:p-8 lg:p-10"
    >
      <div className="space-y-2 text-center">
        {/* Accent line */}
        <div className="mx-auto mb-4 h-px w-12 bg-[#d4a574]/60" />
        
        <h2
          className="text-2xl font-light italic tracking-wide text-[#1f1a17] sm:text-3xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          What our clients say
        </h2>

        {/* Accent line */}
        <div className="mx-auto mt-4 h-px w-12 bg-[#d4a574]/60" />

        <p
          className="max-w-2xl text-sm font-light tracking-widest text-[#7b6a59] uppercase"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Custom suits & sarees delivered to happy clients
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <figure
            key={review.name}
            className="flex flex-col justify-between rounded-xl border border-[#d4a574]/10 bg-white/50 p-5 backdrop-blur-sm"
          >
            <blockquote
              className="text-sm font-light italic leading-relaxed text-[#7b6a59]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium text-[#1f1a17]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {review.name}
                </p>
                <p
                  className="text-xs font-light text-[#7b6a59]"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {review.location}
                </p>
              </div>
              <p className="text-sm text-[#d4a574]" aria-label={`${review.rating} out of 5 stars`}>
                {"★".repeat(review.rating)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
