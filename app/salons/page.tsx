"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { salons } from "@/data/salons";
import SalonCard from "@/components/SalonCard";
import FilterBar from "@/components/FilterBar";
import { SearchX, Sparkles } from "lucide-react";
import Link from "next/link";

function SalonsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve initial city from URL query params, default to "Bangalore"
  const urlCity = searchParams?.get("city") || "Bangalore";
  const urlService = searchParams?.get("service") || "";

  // State Management for Filters
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(urlCity);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(4.0);

  // Sync city selection when URL query param changes
  useEffect(() => {
    if (urlCity) {
      setSelectedCity(urlCity);
    }
  }, [urlCity]);

  // Sync service category when URL query param is present (e.g. from Landing or AI Recommendation redirection)
  useEffect(() => {
    if (urlService) {
      setSelectedServices([urlService]);
    }
  }, [urlService]);

  // Handle updates to City
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    // Sync URL search params
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("city", city);
    router.push(`/salons?${params.toString()}`, { scroll: false });
  };

  // Helper to toggle selected services
  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setSelectedServices([]);
    setSelectedPrice(null);
    setMinRating(4.0);
  };

  // Dynamic Filtering Logic
  const filteredSalons = salons.filter((salon) => {
    // 1. City Filter
    if (salon.city.toLowerCase() !== selectedCity.toLowerCase()) return false;

    // 2. Keyword Search (Name, location, description)
    if (search.trim()) {
      const query = search.toLowerCase();
      const matchName = salon.name.toLowerCase().includes(query);
      const matchLocation = salon.location.toLowerCase().includes(query);
      const matchDesc = salon.description.toLowerCase().includes(query);
      if (!matchName && !matchLocation && !matchDesc) return false;
    }

    // 3. Service Category Filter
    if (selectedServices.length > 0) {
      const salonServiceCategories = salon.services.map((s) => s.category);
      const hasMatchingService = selectedServices.some((cat) =>
        salonServiceCategories.includes(cat as any)
      );
      if (!hasMatchingService) return false;
    }

    // 4. Price Tier Filter
    if (selectedPrice && salon.priceRange !== selectedPrice) return false;

    // 5. Rating Filter
    if (salon.rating < minRating) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner / Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Salons in {selectedCity}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Showing {filteredSalons.length} results matching your selected criteria
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterBar
            search={search}
            setSearch={setSearch}
            selectedCity={selectedCity}
            setSelectedCity={handleCityChange}
            selectedServices={selectedServices}
            toggleService={toggleService}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            minRating={minRating}
            setMinRating={setMinRating}
            onClear={handleClearFilters}
          />
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-3">
          {filteredSalons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSalons.map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-150 rounded-3xl p-12 text-center flex flex-col items-center max-w-lg mx-auto mt-12 shadow-sm">
              <div className="bg-gray-50 p-4 rounded-2xl text-gray-400 mb-4">
                <SearchX className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">No Salons Match Your Filters</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                We couldn't find any studios matching your filter combination. Try resetting filters or expanding your keywords.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full justify-center">
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 bg-gray-950 text-white font-bold rounded-xl hover:bg-gray-800 transition text-sm cursor-pointer"
                >
                  Reset All Filters
                </button>
                <Link
                  href="/ai"
                  className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition text-sm flex items-center justify-center"
                >
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  Ask AI Recommendation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SalonsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">Loading marketplace salons...</p>
      </div>
    }>
      <SalonsContent />
    </Suspense>
  );
}
