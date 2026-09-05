export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbf9f6]">
      <div className="text-center">
        <div className="mb-4 flex justify-center gap-1.5">
          <span
            className="h-3 w-3 animate-bounce rounded-full bg-[#d4a574]"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-3 w-3 animate-bounce rounded-full bg-[#d4a574]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-3 w-3 animate-bounce rounded-full bg-[#d4a574]"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <p
          className="text-sm font-light text-[#7b6a59]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
