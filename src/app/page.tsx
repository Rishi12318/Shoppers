import HeroSection from "@/components/landing/heroSection";
import ScrollReveal from "@/components/landing/ScrollReveal";
import Discription from "@/components/landing/Discription";
import Working from "@/components/landing/Working";
import Review from "@/components/landing/Review";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="w-full text-[#1f1a17]">
      <HeroSection />

      <div className="relative z-10 bg-[#f8f5f1]">
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <Discription />
            </ScrollReveal>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <Working />
            </ScrollReveal>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <Review />
            </ScrollReveal>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <Footer />
            </ScrollReveal>
          </div>
        </section>
      </div>
    </main>
  );
}
