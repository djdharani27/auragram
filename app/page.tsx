import Link from "next/link";
import { Sparkles, MapPin, Search, Calendar, ShieldCheck, Heart } from "lucide-react";
import { salons } from "@/data/salons";
import SalonCard from "@/components/SalonCard";

export default function Home() {
  // Get 3 featured salons
  const featuredSalons = salons.filter((s) => s.featured).slice(0, 3);

  const cities = [
    {
      name: "Bangalore",
      tagline: "Silicon Valley of India",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600&auto=format&fit=crop",
      salonCount: salons.filter((s) => s.city === "Bangalore").length,
    },
    {
      name: "Mumbai",
      tagline: "City of Dreams",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=600&auto=format&fit=crop",
      salonCount: salons.filter((s) => s.city === "Mumbai").length,
    },
    {
      name: "Delhi",
      tagline: "The Historical Capital",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=600&auto=format&fit=crop",
      salonCount: salons.filter((s) => s.city === "Delhi").length,
    },
  ];

  return (
    <div className="flex flex-col space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Tag */}
          <div className="inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full text-pink-600 font-extrabold text-xs tracking-wider uppercase mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Powered Beauty Discovery</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-950 max-w-4xl mx-auto leading-none">
            Find and Book the Best{" "}
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Salons
            </span>{" "}
            in Your City
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">
            Discover premier salons, compare ratings, and book treatments instantly. Don't know where to start? Let our smart AI recommend the perfect stylist for you.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
            <Link
              href="/salons"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gray-950 hover:bg-gray-800 text-white font-bold rounded-2xl transition duration-150 shadow-lg"
            >
              Explore Salons
              <Search className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/ai"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold rounded-2xl transition duration-150 shadow-lg shadow-pink-500/10"
            >
              Ask AI Assistant
              <Sparkles className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Select City Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Browse by City
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Select your city to explore tailored beauty destinations near you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/salons?city=${city.name}`}
              className="group relative h-64 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 block"
            >
              {/* City Image */}
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.7] group-hover:brightness-[0.6]"
              />

              {/* City Label */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-[11px] font-bold tracking-widest uppercase text-pink-400">
                  {city.tagline}
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight mt-0.5">
                  {city.name}
                </h3>
                <span className="text-xs text-gray-300 mt-1 font-semibold flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-pink-400" />
                  {city.salonCount} Verified Salons
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-violet-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl shadow-pink-500/10">
          {/* Background Decorative Glow */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center space-x-1.5 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Smart Salon Recommendations</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get Personalized recommendations with our AI Advisor
            </h2>
            <p className="text-white/80 mt-4 text-sm sm:text-base leading-relaxed">
              Describe your preferences, ideal style, and budget. Our smart AI analysis engine checks through salon profiles, ratings, services, and location parameters to present the top 3 customized studios matching your needs.
            </p>
            <Link
              href="/ai"
              className="inline-flex items-center justify-center bg-white text-gray-950 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition duration-150 mt-8 shadow-md"
            >
              Try AI Finder
              <Sparkles className="h-4 w-4 ml-2 text-pink-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Salons Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Salons
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Discover top-rated wellness destinations selected for their outstanding service
            </p>
          </div>
          <Link
            href="/salons"
            className="text-sm font-bold text-pink-600 hover:text-pink-700 hover:underline transition"
          >
            View all salons →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSalons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      </section>

      {/* Trust & Verification Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-gray-150 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex space-x-4">
            <div className="bg-pink-50 text-pink-600 p-3 rounded-2xl h-fit">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">100% Verified Salons</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Every salon on our platform is personally vetted for hygiene, equipment standards, and styling qualifications.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-violet-50 text-violet-600 p-3 rounded-2xl h-fit">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Instant Confirmations</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Book dynamic availability slots instantly. Zero queues, zero phone calls, and direct confirmation receipts.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-pink-50 text-pink-600 p-3 rounded-2xl h-fit">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Customized Matches</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                We combine user satisfaction history with smart filters and AI advice to locate services tailormade for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
