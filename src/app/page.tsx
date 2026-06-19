// app/page.tsx
import HomeNavbar from "@/components/bars/HomeNavbar";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import Footer from "@/components/sections/home/Footer";
import HeroSection from "@/components/sections/home/HeroSection";


export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full flex flex-col font-sans text-primary dark:text-white transition-colors duration-300 overflow-x-hidden selection:bg-lavender/30">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-[#0a0a0a] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-magenta/20 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50 dark:opacity-20" />

      <HomeNavbar />

      <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-4 md:px-6 relative">
        <HeroSection />
        <FeaturesSection />
      </main>

      <Footer />

      {/* <section className="py-10 border-y border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
            Trusted by innovative institutions
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              "TechUniversity",
              "DesignInstitute",
              "CodeAcademy",
              "FutureSchool",
              "GlobalCampus",
            ].map((brand) => (
              <div key={brand} className="text-xl font-bold font-serif">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-primary dark:bg-white text-white dark:text-black rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 dark:bg-black/10 rounded-full blur-3xl"></div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">
            Ready to modernize your classroom?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of educators saving time and improving student
            outcomes today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/dashboard"
              className="h-14 px-10 rounded-full bg-white text-primary dark:bg-black dark:text-white font-bold text-lg flex items-center justify-center hover:scale-105 transition-transform"
            >
              Get Started for Free
            </Link>
            <button className="h-14 px-10 rounded-full bg-transparent border-2 border-white/30 dark:border-black/20 text-white dark:text-black font-bold text-lg hover:bg-white/10 dark:hover:bg-black/5 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
