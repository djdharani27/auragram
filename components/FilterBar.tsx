import { Search, Star, RefreshCw } from "lucide-react";

interface FilterBarProps {
  search: string;
  setSearch: (s: string) => void;
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  selectedPrice: string | null;
  setSelectedPrice: (price: string | null) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  onClear: () => void;
}

export default function FilterBar({
  search,
  setSearch,
  selectedCity,
  setSelectedCity,
  selectedServices,
  toggleService,
  selectedPrice,
  setSelectedPrice,
  minRating,
  setMinRating,
  onClear,
}: FilterBarProps) {
  const serviceCategories = [
    { value: "haircut", label: "Hair Styling" },
    { value: "facial", label: "Skincare / Facial" },
    { value: "bridal", label: "Bridal & Makeup" },
    { value: "grooming", label: "Men's Grooming" },
  ];

  const priceTiers: ("₹" | "₹₹" | "₹₹₹")[] = ["₹", "₹₹", "₹₹₹"];

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-900">Filters</h2>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center space-x-1 transition-colors"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Reset All
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Search Salons
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or location..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-gray-800 placeholder-gray-400 font-medium"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* City Filter */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          City Location
        </label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-gray-800 font-semibold cursor-pointer"
        >
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
      </div>

      {/* Service Filter */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Service Type
        </label>
        <div className="space-y-2.5">
          {serviceCategories.map((cat) => {
            const isChecked = selectedServices.includes(cat.value);
            return (
              <label
                key={cat.value}
                className="flex items-center space-x-3 text-sm text-gray-600 hover:text-gray-900 cursor-pointer font-medium"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleService(cat.value)}
                  className="rounded text-pink-600 border-gray-300 focus:ring-pink-500 h-4.5 w-4.5 cursor-pointer accent-pink-500"
                />
                <span className={isChecked ? "text-pink-600 font-semibold" : ""}>
                  {cat.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Tier Filter */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Price Range
        </label>
        <div className="grid grid-cols-3 gap-2">
          {priceTiers.map((tier) => {
            const isSelected = selectedPrice === tier;
            return (
              <button
                key={tier}
                onClick={() => setSelectedPrice(isSelected ? null : tier)}
                className={`py-2 text-sm font-bold rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-pink-50 border-pink-500 text-pink-600 shadow-sm shadow-pink-500/5"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tier}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Minimum Rating ({minRating.toFixed(1)}+ Stars)
        </label>
        <input
          type="range"
          min="4.0"
          max="5.0"
          step="0.1"
          value={minRating}
          onChange={(e) => setMinRating(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-bold uppercase">
          <span className="flex items-center">
            4.0 <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-0.5" />
          </span>
          <span className="flex items-center">
            5.0 <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
