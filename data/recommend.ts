// Client-side AI recommendation utility (replaces API route for static export)
import { salons, Salon } from "./salons";

export interface RecommendationRequest {
  budget: "₹" | "₹₹" | "₹₹₹";
  serviceType: "haircut" | "bridal" | "facial" | "grooming";
  location: "Bangalore" | "Mumbai" | "Delhi";
  preference: "luxury" | "budget" | "wellness";
}

export interface RecommendationResult {
  salon: Salon;
  reason: string;
}

function generateReason(salon: Salon, request: RecommendationRequest): string {
  const serviceDetail = salon.services.find((s) => s.category === request.serviceType);
  const parts: string[] = [];

  if (serviceDetail) {
    parts.push(`offers expert "${serviceDetail.name}" at ₹${serviceDetail.price}`);
  }
  if (salon.rating >= 4.7) {
    parts.push(`boasts an outstanding ${salon.rating}/5.0 rating from ${salon.reviewCount}+ customers`);
  } else {
    parts.push(`holds a solid ${salon.rating}/5.0 guest rating`);
  }
  parts.push(`conveniently located in ${salon.location}, ${salon.city}`);

  if (request.preference === "luxury" && salon.priceRange === "₹₹₹") {
    parts.push(`delivers premium luxury-grade service matching your high-end preferences`);
  } else if (request.preference === "budget" && salon.priceRange === "₹") {
    parts.push(`is an excellent pocket-friendly choice without compromising quality`);
  } else if (request.preference === "wellness") {
    const isWellness =
      salon.description.toLowerCase().includes("organic") ||
      salon.description.toLowerCase().includes("wellness") ||
      salon.description.toLowerCase().includes("spa") ||
      salon.description.toLowerCase().includes("natural");
    if (isWellness) parts.push(`specializes in holistic organic wellness treatments`);
  }

  return `${salon.name} — ${parts.join(", ")}.`;
}

export function getRecommendations(
  request: RecommendationRequest,
  customSalons: Salon[] = []
): RecommendationResult[] {
  const allSalons = [...salons, ...customSalons];

  // Filter by city + service
  const candidates = allSalons.filter((salon) => {
    const cityMatch = salon.city.toLowerCase() === request.location.toLowerCase();
    const hasService = salon.services.some((s) => s.category === request.serviceType);
    return cityMatch && hasService;
  });

  if (candidates.length === 0) return [];

  // Score candidates
  const scored = candidates.map((salon) => {
    let score = salon.rating * 2;
    if (salon.featured) score += 1.5;

    if (salon.priceRange === request.budget) {
      score += 3;
    } else if (
      (request.budget === "₹₹" && salon.priceRange === "₹") ||
      (request.budget === "₹₹₹" && salon.priceRange === "₹₹")
    ) {
      score += 1.5;
    } else {
      score -= 2;
    }

    if (request.preference === "luxury" && salon.priceRange === "₹₹₹") score += 3;
    else if (request.preference === "budget" && salon.priceRange === "₹") score += 3;
    else if (request.preference === "wellness") {
      const isWellness =
        salon.description.toLowerCase().includes("organic") ||
        salon.description.toLowerCase().includes("wellness") ||
        salon.description.toLowerCase().includes("spa") ||
        salon.description.toLowerCase().includes("natural");
      if (isWellness) score += 3;
    }

    return { salon, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(({ salon }) => ({
    salon,
    reason: generateReason(salon, request),
  }));
}
