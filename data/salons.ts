export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SalonService {
  name: string;
  price: number;
  duration: string; // e.g. "30 mins"
  category: 'haircut' | 'bridal' | 'facial' | 'grooming';
}

export interface Salon {
  id: string;
  name: string;
  city: 'Bangalore' | 'Mumbai' | 'Delhi';
  rating: number;
  reviewCount: number;
  priceRange: '₹' | '₹₹' | '₹₹₹';
  services: SalonService[];
  location: string;
  address: string;
  description: string;
  imageUrl: string;
  slots: string[];
  featured: boolean;
  contact: string;
}

export const salons: Salon[] = [
  {
    id: "glow-studio",
    name: "Glow Studio & Bridal Lounge",
    city: "Bangalore",
    rating: 4.8,
    reviewCount: 124,
    priceRange: "₹₹",
    location: "Indiranagar",
    address: "12th Main Road, Hal 2nd Stage, Indiranagar, Bangalore - 560038",
    description: "Glow Studio is Bangalore's premier salon for luxury bridal makeups, advanced facial treatments, and bespoke hair styling. Our experienced stylists bring out your natural glow using premium, dermatologist-tested products.",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
    featured: true,
    contact: "+91 98765 43210",
    slots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"],
    services: [
      { name: "Signature Haircut & Styling", price: 800, duration: "45 mins", category: "haircut" },
      { name: "HD Bridal Makeup", price: 8500, duration: "180 mins", category: "bridal" },
      { name: "Gold Radiance Facial", price: 2200, duration: "60 mins", category: "facial" },
      { name: "Complete Grooming Package", price: 3000, duration: "120 mins", category: "grooming" },
      { name: "Keratin Smooth Treatment", price: 4500, duration: "120 mins", category: "haircut" }
    ]
  },
  {
    id: "the-dapper-club",
    name: "The Dapper Club - Men's Salon",
    city: "Bangalore",
    rating: 4.7,
    reviewCount: 98,
    priceRange: "₹₹₹",
    location: "Koramangala",
    address: "80 Feet Road, 4th Block, Koramangala, Bangalore - 560034",
    description: "An ultra-premium grooming lounge designed specifically for the modern man. Experience the finest haircuts, hot-towel shaves, and beard designing from master barbers while sipping on gourmet coffee.",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    featured: true,
    contact: "+91 98765 43211",
    slots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"],
    services: [
      { name: "Executive Haircut & Wash", price: 950, duration: "45 mins", category: "haircut" },
      { name: "Royal Charcoal Facial", price: 1800, duration: "50 mins", category: "facial" },
      { name: "Beard Design & Hot Towel Shave", price: 600, duration: "30 mins", category: "grooming" },
      { name: "Groom Essential Makeover", price: 5000, duration: "150 mins", category: "bridal" }
    ]
  },
  {
    id: "aura-spa-salon",
    name: "Aura Wellness Spa & Salon",
    city: "Bangalore",
    rating: 4.5,
    reviewCount: 86,
    priceRange: "₹₹",
    location: "Whitefield",
    address: "ITPL Main Road, Opposite Prestige Shantiniketan, Whitefield, Bangalore - 560066",
    description: "Escape the city's hustle and bustle at Aura. We offer a holistic approach to beauty and relaxation, combining organic spa therapies with cutting-edge hair and skin treatments in a tranquil zen environment.",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    featured: false,
    contact: "+91 98765 43212",
    slots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"],
    services: [
      { name: "Organic Hydrating Facial", price: 2500, duration: "60 mins", category: "facial" },
      { name: "Stylist Haircut & Deep Conditioning", price: 1200, duration: "60 mins", category: "haircut" },
      { name: "Bridal Party Makeup", price: 6000, duration: "120 mins", category: "bridal" },
      { name: "Detox Body Scrub & Massage", price: 3500, duration: "90 mins", category: "grooming" }
    ]
  },
  {
    id: "urban-shears",
    name: "Urban Shears Express",
    city: "Bangalore",
    rating: 4.2,
    reviewCount: 156,
    priceRange: "₹",
    location: "HSR Layout",
    address: "17th Cross Road, Sector 3, HSR Layout, Bangalore - 560102",
    description: "Urban Shears is Bangalore's favorite smart salon. We focus on hygienic, quick, and highly affordable haircutting, waxing, and basic grooming services without compromising on style.",
    imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
    featured: false,
    contact: "+91 98765 43213",
    slots: ["09:30 AM", "10:30 AM", "11:30 AM", "01:30 PM", "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM", "06:30 PM"],
    services: [
      { name: "Classic Haircut & Blowdry", price: 350, duration: "30 mins", category: "haircut" },
      { name: "Express Fruit Facial", price: 750, duration: "30 mins", category: "facial" },
      { name: "Basic Beard Trim & Shave", price: 200, duration: "20 mins", category: "grooming" },
      { name: "Minimalist Bridal Makeup", price: 3500, duration: "90 mins", category: "bridal" }
    ]
  },
  {
    id: "royal-touch-mumbai",
    name: "Royal Touch Luxury Salon",
    city: "Mumbai",
    rating: 4.9,
    reviewCount: 210,
    priceRange: "₹₹₹",
    location: "Bandra West",
    address: "Carter Road, Opp. Promenade, Bandra West, Mumbai - 400050",
    description: "Royal Touch is a premier celebrity hotspot in Bandra. Providing world-class services, from red-carpet hair designs to advanced skin contouring facials and bespoke luxury bridal packages.",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
    featured: true,
    contact: "+91 98765 43214",
    slots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"],
    services: [
      { name: "Couture Haircut by Master Stylist", price: 2500, duration: "60 mins", category: "haircut" },
      { name: "Royal Oxygen Infusion Facial", price: 4800, duration: "75 mins", category: "facial" },
      { name: "Ultra HD Celebrity Bridal Makeup", price: 15000, duration: "240 mins", category: "bridal" },
      { name: "Grooming & Hair Spa Experience", price: 4000, duration: "90 mins", category: "grooming" }
    ]
  },
  {
    id: "curl-co-juhu",
    name: "Curl & Co. Hair Boutique",
    city: "Mumbai",
    rating: 4.6,
    reviewCount: 74,
    priceRange: "₹₹",
    location: "Juhu",
    address: "Juhu Tara Road, Near Juhu Beach, Mumbai - 400049",
    description: "Mumbai's first boutique salon specializing in textured and curly hair care. We offer curl-cuts, moisture therapies, organic coloring, and rejuvenating facials, all in a beautiful coastal-inspired setting.",
    imageUrl: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop",
    featured: false,
    contact: "+91 98765 43215",
    slots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"],
    services: [
      { name: "Specialized Curly Haircut & Styling", price: 1500, duration: "75 mins", category: "haircut" },
      { name: "Deep Moisture Curl Therapy", price: 2000, duration: "60 mins", category: "haircut" },
      { name: "Aloe Gel Soothing Facial", price: 1800, duration: "45 mins", category: "facial" },
      { name: "Minimalist Bride Hair & Makeup", price: 7000, duration: "120 mins", category: "bridal" }
    ]
  },
  {
    id: "the-grooming-room-fort",
    name: "The Grooming Room",
    city: "Mumbai",
    rating: 4.4,
    reviewCount: 112,
    priceRange: "₹₹",
    location: "Fort",
    address: "Mahatma Gandhi Road, Near Flora Fountain, Fort, Mumbai - 400001",
    description: "Nestled in the historic Fort area, The Grooming Room merges heritage British barbershop charm with modern salon styles. Perfect for gentlemen who appreciate precision cuts and traditional wet shaves.",
    imageUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    featured: false,
    contact: "+91 98765 43216",
    slots: ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "07:00 PM"],
    services: [
      { name: "Classic Scissor Cut & Styling", price: 600, duration: "45 mins", category: "haircut" },
      { name: "Beard Grooming & Steam Shave", price: 400, duration: "30 mins", category: "grooming" },
      { name: "De-tan Herbal Facial", price: 1200, duration: "45 mins", category: "facial" }
    ]
  },
  {
    id: "velvet-oasis-delhi",
    name: "Velvet Oasis Skin & Bridal Sanctuary",
    city: "Delhi",
    rating: 4.8,
    reviewCount: 142,
    priceRange: "₹₹₹",
    location: "Greater Kailash",
    address: "M-Block Market, Greater Kailash II, New Delhi - 110048",
    description: "Velvet Oasis is an award-winning luxury retreat in South Delhi. We specialize in non-invasive aesthetic treatments, bespoke bridal makeup styling, and premium hair treatments led by certified global experts.",
    imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=800&auto=format&fit=crop",
    featured: true,
    contact: "+91 98765 43217",
    slots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"],
    services: [
      { name: "Advanced Collagen Lift Facial", price: 4500, duration: "75 mins", category: "facial" },
      { name: "Red Carpet Bridal Makeup & Hair", price: 18000, duration: "240 mins", category: "bridal" },
      { name: "Global Hair Coloring & Haircut", price: 5500, duration: "150 mins", category: "haircut" },
      { name: "Luxe Grooming Spa Package", price: 5000, duration: "120 mins", category: "grooming" }
    ]
  },
  {
    id: "monsoon-salon-cp",
    name: "Monsoon Salon & Spa",
    city: "Delhi",
    rating: 4.5,
    reviewCount: 188,
    priceRange: "₹₹",
    location: "Connaught Place",
    address: "Outer Circle, Connaught Place, New Delhi - 110001",
    description: "Monsoon Salon is one of Delhi's most popular beauty destinations. Offering a complete array of beauty services under one roof, our high-energy studio is famous for trendy haircuts and bright creative colors.",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
    featured: false,
    contact: "+91 98765 43218",
    slots: ["09:30 AM", "11:30 AM", "01:30 PM", "03:30 PM", "05:30 PM", "07:30 PM"],
    services: [
      { name: "Trendy Haircut & Styling", price: 850, duration: "45 mins", category: "haircut" },
      { name: "Insta-Glow Insta-Facial", price: 1500, duration: "40 mins", category: "facial" },
      { name: "Airbrush Bridal Makeup", price: 10000, duration: "180 mins", category: "bridal" },
      { name: "Beard Spa & Styling", price: 500, duration: "30 mins", category: "grooming" }
    ]
  },
  {
    id: "eco-chic-vasant-vihar",
    name: "Eco-Chic Wellness & Organic Salon",
    city: "Delhi",
    rating: 4.3,
    reviewCount: 65,
    priceRange: "₹₹",
    location: "Vasant Vihar",
    address: "Basant Lok Market, Vasant Vihar, New Delhi - 110057",
    description: "Delighting eco-conscious clients, Eco-Chic offers premium beauty, skin and nail care services utilizing exclusively natural, cruelty-free, and vegan botanical formulas in a serene, chemical-free ambiance.",
    imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop",
    featured: false,
    contact: "+91 98765 43219",
    slots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"],
    services: [
      { name: "Botanical Detox Facial", price: 2200, duration: "60 mins", category: "facial" },
      { name: "Organic Pedicure & Nail Care", price: 1100, duration: "45 mins", category: "grooming" },
      { name: "Organic Oil Head Massage & Styling", price: 900, duration: "50 mins", category: "haircut" },
      { name: "Natural Herbs Bridal Makeup", price: 8000, duration: "150 mins", category: "bridal" }
    ]
  }
];

export const mockReviews: Record<string, Review[]> = {
  "glow-studio": [
    { id: "r1", author: "Aishwarya R.", rating: 5, comment: "I booked their HD Bridal Makeup package for my wedding. The team was phenomenal! Everyone loved the styling. Worth every rupee.", date: "2026-05-20" },
    { id: "r2", author: "Rohan Kumar", rating: 4, comment: "Got a haircut and facial here. Extremely clean and professional staff.", date: "2026-05-18" }
  ],
  "the-dapper-club": [
    { id: "r3", author: "Vikram Malhotra", rating: 5, comment: "Best beard styling and shaving experience in Bangalore. The barbers really understand different beard shapes.", date: "2026-05-15" },
    { id: "r4", author: "Aditya Hegde", rating: 4.5, comment: "A bit expensive but the service, ambiance, and free espresso make up for it.", date: "2026-05-10" }
  ],
  "aura-spa-salon": [
    { id: "r5", author: "Priya Sharma", rating: 5, comment: "The Organic Hydrating Facial was incredibly soothing. Beautiful, relaxing atmosphere.", date: "2026-05-12" }
  ],
  "urban-shears": [
    { id: "r6", author: "Suresh Gupta", rating: 4, comment: "Quick and pocket-friendly haircut. Just what I needed. Highly recommended for daily grooming.", date: "2026-05-22" }
  ],
  "royal-touch-mumbai": [
    { id: "r7", author: "Kareena K.", rating: 5, comment: "Absolutely elite service. Master stylist did wonders with my hair. This is my new go-to place.", date: "2026-05-25" },
    { id: "r8", author: "Ranveer S.", rating: 5, comment: "Excellent facial and hair styling. They treatment you like royalty here.", date: "2026-05-24" }
  ],
  "curl-co-juhu": [
    { id: "r9", author: "Shruti Sen", rating: 4.5, comment: "Finally, a salon that knows how to cut curly hair! They didn't just blow dry it straight. Life saver.", date: "2026-05-19" }
  ],
  "the-grooming-room-fort": [
    { id: "r10", author: "Farhan A.", rating: 4, comment: "Top class steam shave. Takes you back to classic barbershops. Nice decor too.", date: "2026-05-21" }
  ],
  "velvet-oasis-delhi": [
    { id: "r11", author: "Megha Mehra", rating: 5, comment: "The advanced collagen facial was amazing. My skin feels so soft and refreshed. Incredible service.", date: "2026-05-23" },
    { id: "r12", author: "Divya Kapoor", rating: 4.8, comment: "Did my bridal trial here. Extremely skilled makeup artists.", date: "2026-05-17" }
  ],
  "monsoon-salon-cp": [
    { id: "r13", author: "Kabir Dev", rating: 4.5, comment: "Always a great haircut from Monsoon. CP branch is spacious and clean.", date: "2026-05-14" }
  ],
  "eco-chic-vasant-vihar": [
    { id: "r14", author: "Neha Dhupia", rating: 4, comment: "Loved the organic head massage. Using botanical products is a huge plus.", date: "2026-05-11" }
  ]
};
