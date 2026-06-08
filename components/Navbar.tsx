"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Sparkles, MapPin, Calendar, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Get current city from URL or default to Bangalore
  const currentCity = searchParams?.get("city") || "Bangalore";

  const handleCityChange = (city: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("city", city);
    router.push(`/salons?${params.toString()}`);
  };

  const navLinks = [
    { name: "Explore Salons", href: "/salons" },
    { name: "AI Recommendation", href: "/ai", highlight: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & City Selector */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-pink-500 to-violet-600 p-2 rounded-xl text-white shadow-md shadow-pink-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
                AuraGlam
              </span>
            </Link>

            {/* City Selector */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition duration-150">
              <MapPin className="h-3.5 w-3.5 text-pink-500" />
              <select
                value={currentCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="bg-transparent border-none focus:outline-none pr-6 font-medium cursor-pointer text-gray-800"
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-150 ${
                  link.highlight
                    ? "inline-flex items-center px-4 py-2 rounded-full text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 shadow-md shadow-pink-500/10 hover:shadow-pink-500/20"
                    : pathname === link.href
                    ? "text-pink-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.highlight && <Sparkles className="h-4 w-4 mr-1.5 animate-pulse" />}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-950 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white px-4 pt-2 pb-4 space-y-3 shadow-lg">
          {/* Mobile City Selector */}
          <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm">
            <MapPin className="h-4 w-4 text-pink-500" />
            <span className="text-gray-500">Location:</span>
            <select
              value={currentCity}
              onChange={(e) => {
                handleCityChange(e.target.value);
                setIsOpen(false);
              }}
              className="bg-transparent border-none font-bold text-gray-800 focus:outline-none flex-1"
            >
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          {/* Mobile Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-base font-semibold ${
                link.highlight
                  ? "text-center text-white bg-gradient-to-r from-pink-500 to-violet-600"
                  : pathname === link.href
                  ? "text-pink-600 bg-pink-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center justify-center">
                {link.highlight && <Sparkles className="h-4 w-4 mr-2" />}
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
