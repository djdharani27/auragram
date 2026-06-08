import { NextResponse } from "next/server";
import { salons, Salon } from "@/data/salons";

interface RecommendationRequest {
  budget: "₹" | "₹₹" | "₹₹₹";
  serviceType: "haircut" | "bridal" | "facial" | "grooming";
  location: "Bangalore" | "Mumbai" | "Delhi";
  preference: "luxury" | "budget" | "wellness";
}

// Fallback rule-based reason generator
function generateRuleBasedReason(salon: Salon, request: RecommendationRequest): string {
  const serviceDetail = salon.services.find((s) => s.category === request.serviceType);
  const price = serviceDetail ? `₹${serviceDetail.price}` : "";
  
  const reasons: string[] = [];

  // 1. Service capability match
  if (serviceDetail) {
    reasons.push(`Highly recommended for its expert "${serviceDetail.name}" priced at ${price}`);
  }

  // 2. Rating comment
  if (salon.rating >= 4.7) {
    reasons.push(`boasts an outstanding ${salon.rating}/5.0 star satisfaction rating from ${salon.reviewCount} customers`);
  }

  // 3. Location match
  reasons.push(`conveniently located in ${salon.location}`);

  // 4. Preference match
  if (request.preference === "luxury" && salon.priceRange === "₹₹₹") {
    reasons.push(`matches your desire for premium luxury amenities and celebrity-standard service`);
  } else if (request.preference === "budget" && salon.priceRange === "₹") {
    reasons.push(`outstanding pocket-friendly option for high-quality value treatments`);
  } else if (request.preference === "wellness" && salon.description.toLowerCase().includes("organic") || salon.description.toLowerCase().includes("spa") || salon.description.toLowerCase().includes("wellness")) {
    reasons.push(`ideal choice for organic, holistic, and chemical-free skin/hair wellness`);
  }

  // Combine reasons into a nice paragraph
  const start = `${salon.name} is the perfect fit: it `;
  const joinStr = reasons.length > 2 
    ? `, ${reasons.slice(0, -1).join(", ")}, and it ${reasons[reasons.length - 1]}.`
    : `, ${reasons.join(" and ")}.`;
    
  return start + reasons.join(", ").replace(/,([^,]*)$/, ', and$1') + ".";
}

// Main handler
export async function POST(req: Request) {
  try {
    const body: RecommendationRequest = await req.json();
    const { budget, serviceType, location, preference } = body;

    if (!budget || !serviceType || !location || !preference) {
      return NextResponse.json(
        { error: "Missing required fields: budget, serviceType, location, preference" },
        { status: 400 }
      );
    }

    // 1. Filter salons by city and service availability
    const candidateSalons = salons.filter((salon) => {
      const cityMatches = salon.city.toLowerCase() === location.toLowerCase();
      const hasService = salon.services.some((s) => s.category === serviceType);
      return cityMatches && hasService;
    });

    if (candidateSalons.length === 0) {
      return NextResponse.json({ recommendations: [] });
    }

    // 2. Score candidates based on rules
    const scoredCandidates = candidateSalons.map((salon) => {
      let score = 0;

      // Rating score
      score += salon.rating * 2;

      // Featured score
      if (salon.featured) score += 1.5;

      // Budget match score
      if (salon.priceRange === budget) {
        score += 3;
      } else if (
        (budget === "₹₹" && salon.priceRange === "₹") || 
        (budget === "₹₹₹" && salon.priceRange === "₹₹")
      ) {
        score += 1.5; // Acceptable cheaper options
      } else {
        score -= 2; // Mismatched budget
      }

      // Preference score
      if (preference === "luxury" && salon.priceRange === "₹₹₹") {
        score += 3;
      } else if (preference === "budget" && salon.priceRange === "₹") {
        score += 3;
      } else if (preference === "wellness") {
        const hasWellnessKeywords = 
          salon.description.toLowerCase().includes("organic") ||
          salon.description.toLowerCase().includes("wellness") ||
          salon.description.toLowerCase().includes("spa") ||
          salon.description.toLowerCase().includes("natural");
        if (hasWellnessKeywords) score += 3;
      }

      return { salon, score };
    });

    // Sort candidates by score descending
    scoredCandidates.sort((a, b) => b.score - a.score);

    // Take top 3 recommendations
    const topCandidates = scoredCandidates.slice(0, 3);

    // Check if OpenAI API Key is configured for enhancement
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        const salonPromptList = topCandidates.map((c) => {
          return `- ID: ${c.salon.id}, Name: ${c.salon.name}, Location: ${c.salon.location}, Price Range: ${c.salon.priceRange}, Description: ${c.salon.description}, Services: ${c.salon.services.map(s => `${s.name} (₹${s.price})`).join(", ")}`;
        }).join("\n");

        const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are a professional salon recommendation advisor. Given a user's search preferences (city, budget, service type, and lifestyle preference) and a list of salons, generate exactly one paragraph explaining the unique reasoning of why each salon is a perfect match. Return your answer as a JSON array of strings, where each element corresponds to the reasoning for the salon in the input order. Ensure no keys are outputted, only a raw JSON array of strings: [\"reason 1\", \"reason 2\", \"reason 3\"]. Keep the reasoning under 2-3 sentences, engaging, and professional.",
              },
              {
                role: "user",
                content: `User Request:
- Location: ${location}
- Service Type: ${serviceType}
- Budget: ${budget}
- Preference: ${preference}

Salons list:
${salonPromptList}

Return exactly a JSON array of strings containing the reasoning.`,
              },
            ],
            response_format: { type: "json_object" },
          }),
        });

        if (openaiResponse.ok) {
          const aiData = await openaiResponse.json();
          const responseText = aiData.choices[0].message.content;
          // Parse the response
          const parsed = JSON.parse(responseText);
          // Look for array within JSON (either key 'reasons', 'recommendations', or raw array)
          const reasonsArray: string[] = Array.isArray(parsed) 
            ? parsed 
            : parsed.reasons || parsed.recommendations || Object.values(parsed)[0];

          if (Array.isArray(reasonsArray)) {
            const recommendations = topCandidates.map((c, i) => ({
              salon: c.salon,
              reason: reasonsArray[i] || generateRuleBasedReason(c.salon, body),
            }));
            return NextResponse.json({ recommendations });
          }
        }
      } catch (err) {
        console.error("OpenAI Recommendation Enhancement failed, falling back to rule-based: ", err);
      }
    }

    // Default Fallback - rule-based reasons
    const recommendations = topCandidates.map((c) => ({
      salon: c.salon,
      reason: generateRuleBasedReason(c.salon, body),
    }));

    return NextResponse.json({ recommendations });
  } catch (error: any) {
    console.error("AI recommend API handler crashed: ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
