import Link from "next/link";
import { Star, MapPin, IndianRupee } from "lucide-react";
import { Salon } from "@/data/salons";

interface SalonCardProps {
  salon: Salon;
}

export default function SalonCard({ salon }: SalonCardProps) {
  // Helper to render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-bold text-gray-800">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="group bg-white border border-gray-150 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Salon Image */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={salon.imageUrl}
          alt={salon.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {salon.featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
            Featured
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center">
          <MapPin className="h-3 w-3 text-pink-500 mr-1" />
          {salon.location}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Price */}
          <div className="flex items-center justify-between mb-2">
            {renderStars(salon.rating)}
            <span className="text-xs font-semibold text-gray-500 px-2 py-0.5 bg-gray-100 rounded-md">
              {salon.priceRange} Price Tier
            </span>
          </div>

          {/* Name & Description */}
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {salon.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 mb-4 line-clamp-2 leading-relaxed">
            {salon.description}
          </p>

          {/* Services Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {Array.from(new Set(salon.services.map((s) => s.category))).map((cat) => (
              <span
                key={cat}
                className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg bg-pink-50 text-pink-600 border border-pink-100/50"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* View Details Action */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            <span className="font-semibold text-gray-700 block">
              ₹{Math.min(...salon.services.map((s) => s.price))}+
            </span>
            Starting price
          </div>
          <Link
            href={`/salon/${salon.id}`}
            className="inline-flex items-center text-xs font-bold text-white bg-gray-950 hover:bg-pink-600 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
