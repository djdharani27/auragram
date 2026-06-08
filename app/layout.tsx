import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraGlam - Premium Beauty Salon Booking & AI Finder",
  description: "Find the best beauty salons in Bangalore, Mumbai, and Delhi. Book services online or get personalized AI-powered recommendations matching your preferences and budget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100 animate-pulse" />}>
          <Navbar />
        </Suspense>
        
        <main className="flex-grow">{children}</main>

        <footer className="bg-white border-t border-gray-100 py-10 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-extrabold text-lg bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
              AuraGlam
            </span>
            <p className="text-sm text-gray-400 mt-2">
              © {new Date().getFullYear()} AuraGlam Marketplace. Built for Beauty, Powered by AI.
            </p>
            <p className="text-xs text-gray-300 mt-1">
              For demo and hackathon presentation purposes only. All salon details and bookings are simulated.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
