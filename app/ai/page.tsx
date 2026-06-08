"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, BookOpen, Cpu, RefreshCw, Compass, Star } from "lucide-react";
import { Salon } from "@/data/salons";
import { getRecommendations, RecommendationRequest, RecommendationResult } from "@/data/recommend";

export default function AIPage() {
  const [location, setLocation] = useState<"Bangalore" | "Mumbai" | "Delhi">("Bangalore");
  const [serviceType, setServiceType] = useState<"haircut" | "bridal" | "facial" | "grooming">("haircut");
  const [budget, setBudget] = useState<"₹" | "₹₹" | "₹₹₹">("₹₹");
  const [preference, setPreference] = useState<"luxury" | "budget" | "wellness">("luxury");

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [searched, setSearched] = useState(false);

  const loadingMessages = [
    "Reading your beauty parameters...",
    "Filtering local salon registries...",
    "Analyzing pricing & available slots...",
    "Evaluating guest review sentiments...",
    "Synthesizing AI reasoning...",
  ];

  const handleGetRecommendations = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    setRecommendations([]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < loadingMessages.length - 1) {
        step++;
        setLoadingStep(step);
      }
    }, 400);

    // Load custom salons from localStorage
    const customSalons: Salon[] = JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("custom_salons") || "[]" : "[]"
    );

    // Simulate slight delay for UX
    setTimeout(() => {
      const results = getRecommendations({ location, serviceType, budget, preference }, customSalons);
      clearInterval(interval);
      setRecommendations(results);
      setLoading(false);
      setLoadingStep(0);
    }, 2200);
  };

  const handleReset = () => {
    setRecommendations([]);
    setSearched(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-1.5 bg-violet-50 border border-violet-100 px-3.5 py-1.5 rounded-full text-violet-600 font-extrabold text-xs tracking-wider uppercase mb-4">
          <Cpu className="h-3.5 w-3.5 animate-pulse" />
          <span>AuraGlam AI Engine v1.0</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 tracking-tight">
          AI Salon{" "}
          <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
            Advisor
          </span>
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
          Answer 4 quick questions and let our engine recommend the best matching salons in your city — including community-listed shops.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left — Questionnaire */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-extrabold text-lg text-gray-950 mb-6 flex items-center border-b border-gray-100 pb-3">
            <Compass className="h-5 w-5 text-pink-500 mr-2" />
            Your Style Questionnaire
          </h2>

          <form onSubmit={handleGetRecommendations} className="space-y-6">
            {/* 1. Location */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                1. Select Location City
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(["Bangalore", "Mumbai", "Delhi"] as const).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setLocation(city)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      location === city
                        ? "bg-pink-50 border-pink-500 text-pink-600 shadow-sm"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Service */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                2. What Service are you looking for?
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 font-semibold text-gray-800 cursor-pointer"
              >
                <option value="haircut">💇 Hair Styling & Coloring</option>
                <option value="facial">🧖 Skincare & Facial</option>
                <option value="bridal">👰 Bridal Trial & Makeup</option>
                <option value="grooming">💈 Beard Design & Men's Grooming</option>
              </select>
            </div>

            {/* 3. Budget */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                3. Budget Tier?
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { value: "₹", desc: "Budget" },
                  { value: "₹₹", desc: "Mid-Range" },
                  { value: "₹₹₹", desc: "Premium" },
                ].map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setBudget(tier.value as any)}
                    className={`py-2 text-center rounded-xl border flex flex-col items-center transition-all ${
                      budget === tier.value
                        ? "bg-pink-50 border-pink-500 text-pink-600 shadow-sm"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-extrabold text-sm">{tier.value}</span>
                    <span className="text-[9px] font-semibold text-gray-400 mt-0.5">{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Preference */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                4. Match my Preference with
              </label>
              <div className="space-y-2">
                {[
                  { value: "luxury", title: "Red Carpet / Luxury", desc: "Premium amenities & veteran stylists" },
                  { value: "budget", title: "Smart Value / Affordable", desc: "Hygienic, pocket-friendly & quick" },
                  { value: "wellness", title: "Organic / Wellness Spa", desc: "Eco-friendly botanical treatments" },
                ].map((pref) => {
                  const isSelected = preference === pref.value;
                  return (
                    <button
                      key={pref.value}
                      type="button"
                      onClick={() => setPreference(pref.value as any)}
                      className={`w-full p-3.5 text-left border rounded-2xl transition-all flex items-start space-x-3 ${
                        isSelected
                          ? "bg-violet-50 border-violet-500 shadow-sm"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        readOnly
                        checked={isSelected}
                        className="accent-violet-600 mt-0.5"
                      />
                      <div>
                        <span className="font-extrabold text-sm block text-gray-900">{pref.title}</span>
                        <span className="text-[11px] text-gray-400 font-semibold">{pref.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-extrabold rounded-2xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 ${
                loading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>{loading ? "Advisor is Thinking..." : "Get AI Recommendations"}</span>
            </button>
          </form>
        </div>

        {/* Right — Results */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[480px] shadow-sm">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
                <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-pink-500 animate-pulse" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900">Matching salons for you...</h3>
              <p className="text-sm text-pink-600 font-bold mt-2 animate-pulse">{loadingMessages[loadingStep]}</p>
              <div className="w-48 bg-gray-100 h-1 rounded-full overflow-hidden mt-6">
                <div
                  className="bg-gradient-to-r from-pink-500 to-violet-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                />
              </div>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-lg text-gray-900 flex items-center">
                  <Cpu className="h-5 w-5 text-violet-600 mr-2" />
                  Top Matches for You
                </h2>
                <button
                  onClick={handleReset}
                  className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center transition"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Ask Again
                </button>
              </div>

              {recommendations.map((rec) => (
                <div
                  key={rec.salon.id}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-48 h-48 md:h-auto bg-gray-100 relative shrink-0">
                    <img src={rec.salon.imageUrl} alt={rec.salon.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-white/95 text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-sm flex items-center">
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                      {rec.salon.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-bold text-lg text-gray-900">{rec.salon.name}</h3>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                          {rec.salon.priceRange} Tier
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-semibold flex items-center mb-4">
                        <MapPin className="h-3.5 w-3.5 text-pink-500 mr-0.5" />
                        {rec.salon.location}
                      </span>
                      <div className="bg-gradient-to-tr from-pink-500/5 to-violet-600/5 border border-pink-100/50 p-4 rounded-2xl mb-4">
                        <div className="flex items-center space-x-1.5 text-pink-600 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>AI Recommendation Logic</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed font-semibold">{rec.reason}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      <Link href={`/salon/${rec.salon.id}`} className="text-xs font-bold text-gray-600 hover:text-pink-600 transition flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        View Details
                      </Link>
                      <Link
                        href={`/book/${rec.salon.id}?slot=${encodeURIComponent(rec.salon.slots[0])}`}
                        className="text-xs font-bold text-white bg-gray-950 hover:bg-pink-600 px-4 py-2.5 rounded-xl transition shadow-sm"
                      >
                        Book First Slot
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searched ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[480px] shadow-sm">
              <h3 className="font-bold text-lg text-gray-900">No Matches Found</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                No salons in {location} match your {serviceType} search. Try adjusting your preferences.
              </p>
              <button onClick={handleReset} className="mt-6 px-5 py-2.5 bg-gray-950 text-white font-bold rounded-xl hover:bg-gray-800 transition text-sm">
                Reset
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-tr from-pink-500/5 to-violet-600/5 border border-pink-100/50 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[480px] shadow-sm">
              <div className="bg-white border border-pink-100/50 shadow-md p-5 rounded-3xl text-pink-500 mb-6 animate-pulse">
                <Sparkles className="h-10 w-10" />
              </div>
              <h3 className="font-extrabold text-xl text-gray-900">Get Instant AI Recommendations</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm leading-relaxed font-semibold">
                Fill out the questionnaire and our engine will match you with the top 3 salons — including community-listed shops.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
