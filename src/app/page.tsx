export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5f1] px-4 py-8 text-[#1f1a17] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section
          aria-label="Sign In and Sign Up Section"
          className="rounded-2xl border border-[#d9cdbf] bg-white p-6 shadow-sm sm:p-8 lg:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-[#e9dfd4] p-5">
              <div className="h-6 w-28 rounded border border-[#d9cdbf] bg-[#fbf9f6] px-3 text-sm leading-6 text-[#7b6a59]">
                Sign In
              </div>
              <input
                disabled
                placeholder="Email"
                className="h-11 w-full rounded border border-[#d9cdbf] bg-[#fbf9f6] px-3 text-sm text-[#7b6a59] placeholder:text-[#7b6a59]"
              />
              <input
                disabled
                placeholder="Password"
                className="h-11 w-full rounded border border-[#d9cdbf] bg-[#fbf9f6] px-3 text-sm text-[#7b6a59] placeholder:text-[#7b6a59]"
              />
              <button
                disabled
                className="h-11 w-40 rounded border border-[#d9cdbf] bg-[#f5efe7] px-4 text-sm text-[#7b6a59]"
              >
                Authentication
              </button>
            </div>

            <div className="space-y-4 rounded-xl border border-[#e9dfd4] p-5">
              <div className="h-6 w-28 rounded border border-[#d9cdbf] bg-[#fbf9f6] px-3 text-sm leading-6 text-[#7b6a59]">
                Sign Up
              </div>
              <input
                disabled
                placeholder="Email"
                className="h-11 w-full rounded border border-[#d9cdbf] bg-[#fbf9f6] px-3 text-sm text-[#7b6a59] placeholder:text-[#7b6a59]"
              />
              <input
                disabled
                placeholder="Password"
                className="h-11 w-full rounded border border-[#d9cdbf] bg-[#fbf9f6] px-3 text-sm text-[#7b6a59] placeholder:text-[#7b6a59]"
              />
              <input
                disabled
                placeholder="Confirm Password"
                className="h-11 w-full rounded border border-[#d9cdbf] bg-[#fbf9f6] px-3 text-sm text-[#7b6a59] placeholder:text-[#7b6a59]"
              />
              <button
                disabled
                className="h-11 w-40 rounded border border-[#d9cdbf] bg-[#f5efe7] px-4 text-sm text-[#7b6a59]"
              >
                Authentication
              </button>
            </div>
          </div>
        </section>

        <section
          aria-label="About Platform Description Section"
          className="min-h-[360px] rounded-2xl border border-[#d9cdbf] bg-white p-6 shadow-sm sm:p-8 lg:p-10"
        />

        <section
          aria-label="How It Works Section"
          className="min-h-[320px] rounded-2xl border border-[#d9cdbf] bg-white p-6 shadow-sm sm:p-8 lg:p-10"
        />

        <section
          aria-label="Customer Reviews Section"
          className="min-h-[300px] rounded-2xl border border-[#d9cdbf] bg-white p-6 shadow-sm sm:p-8 lg:p-10"
        />

        <footer
          aria-label="Footer"
          className="flex h-28 items-center justify-center rounded-2xl border border-[#d9cdbf] bg-white shadow-sm"
        >
          <a
            href="https://github.com/Rishi12318/Shoppers"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[#d9cdbf] px-5 py-2 text-sm text-[#7b6a59] transition-colors hover:bg-[#f8f5f1]"
          >
            GitHub
          </a>
        </footer>
      </div>
    </main>
  );
}