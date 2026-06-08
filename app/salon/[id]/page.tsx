"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, MapPin, Phone, ArrowLeft, Clock, Calendar, Check } from "lucide-react";
import { salons, mockReviews, Review } from "@/data/salons";

export default function SalonDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  // Find the salon by ID
  const salon = salons.find((s) => s.id === id);

  // State Management
  const [activeTab, setActiveTab] = useState<"services" | "reviews">("services");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  // Review Form State
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  // Load reviews from localStorage or fallback to mockReviews
  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem(`reviews_${id}`);
    if (stored) {
      setReviewsList(JSON.parse(stored));
    } else {
      const defaultReviews = mockReviews[id] || [];
      setReviewsList(defaultReviews);
    }
  }, [id]);

  // Handle Review Submission
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newReview: Review = {
      id: `review_${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));

    // Reset Form
    setNewAuthor("");
    setNewRating(5);
    setNewComment("");
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3000);
  };

  // If salon is not found
  if (!salon) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-white border border-gray-150 rounded-3xl text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Salon Not Found</h2>
        <p className="text-gray-500 mt-2">The salon you are looking for does not exist or has been removed.</p>
        <Link
          href="/salons"
          className="inline-flex items-center text-sm font-bold text-white bg-gray-950 px-6 py-3 rounded-xl hover:bg-gray-800 transition mt-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Salons
        </Link>
      </div>
    );
  }

  // Calculate dynamic rating and review counts
  const averageRating = reviewsList.length > 0
    ? reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / reviewsList.length
    : salon.rating;
  const totalReviewsCount = reviewsList.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href={`/salons?city=${salon.city}`}
        className="inline-flex items-center text-sm font-bold text-gray-600 hover:text-pink-600 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Explore Salons in {salon.city}
      </Link>

      {/* Grid Header Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Visual Image Banner */}
          <div className="h-80 sm:h-96 w-full rounded-3xl overflow-hidden bg-gray-100 shadow-sm relative">
            <img
              src={salon.imageUrl}
              alt={salon.name}
              className="w-full h-full object-cover"
            />
            {salon.featured && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[11px] font-extrabold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-md">
                Featured Partner
              </span>
            )}
          </div>

          {/* Description & Contact Box */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {salon.name}
              </h1>
              <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-xl">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold">{averageRating.toFixed(1)}</span>
                <span className="text-xs text-gray-400 font-semibold">({totalReviewsCount} reviews)</span>
              </div>
            </div>

            <div className="space-y-3.5 mb-6 text-sm text-gray-600">
              <p className="flex items-start">
                <MapPin className="h-4 w-4 text-pink-500 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-gray-900 block font-semibold">{salon.location}</strong>
                  {salon.address}
                </span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 text-pink-500 mr-2 shrink-0" />
                <span className="font-semibold text-gray-700">{salon.contact}</span>
              </p>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed pt-4 border-t border-gray-100">
              {salon.description}
            </p>
          </div>

          {/* Tab Menu Panel */}
          <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm">
            {/* Tabs Trigger */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("services")}
                className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all ${
                  activeTab === "services"
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Services Menu
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all ${
                  activeTab === "reviews"
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Guest Reviews ({totalReviewsCount})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8">
              {activeTab === "services" ? (
                <div className="space-y-6">
                  <h3 className="font-extrabold text-lg text-gray-900 mb-2">Available Treatments</h3>
                  <div className="divide-y divide-gray-100">
                    {salon.services.map((service, index) => (
                      <div key={index} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-900 text-sm sm:text-base">{service.name}</span>
                            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 tracking-wider">
                              {service.category}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 block mt-1 flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {service.duration}
                          </span>
                        </div>
                        <span className="font-extrabold text-pink-600 text-base shrink-0">
                          ₹{service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Rating Overview */}
                  <div className="flex items-center space-x-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-center">
                      <span className="block text-4xl font-extrabold text-gray-900">{averageRating.toFixed(1)}</span>
                      <span className="text-xs font-semibold text-gray-400 block mt-1">out of 5.0</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.round(averageRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-bold">
                        Based on {totalReviewsCount} verified customer bookings
                      </span>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4 pt-2">
                    {reviewsList.length > 0 ? (
                      reviewsList.map((rev) => (
                        <div key={rev.id} className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                          <div className="flex items-center justify-between mb-2.5">
                            <div>
                              <span className="font-bold text-sm text-gray-900 block">{rev.author}</span>
                              <span className="text-xs text-gray-400 font-semibold">{rev.date}</span>
                            </div>
                            <div className="flex items-center space-x-0.5 bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-100 text-yellow-700">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-xs font-bold">{rev.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic text-center py-6">
                        No reviews yet. Be the first to write a review!
                      </p>
                    )}
                  </div>

                  {/* Add Review Form */}
                  <form onSubmit={handleAddReview} className="border-t border-gray-100 pt-8 mt-8 space-y-4">
                    <h4 className="font-extrabold text-base text-gray-900">Share Your Experience</h4>
                    
                    {showReviewSuccess && (
                      <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-xs font-bold flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        Thank you! Your mock review was posted successfully.
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="e.g. Priyal C."
                          className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Rating
                        </label>
                        <select
                          value={newRating}
                          onChange={(e) => setNewRating(parseInt(e.target.value))}
                          className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-semibold text-gray-800 cursor-pointer"
                        >
                          <option value={5}>5 Stars (Excellent)</option>
                          <option value={4}>4 Stars (Good)</option>
                          <option value={3}>3 Stars (Average)</option>
                          <option value={2}>2 Stars (Poor)</option>
                          <option value={1}>1 Star (Very Bad)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Your Review Comments
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tell us what you liked or disliked about their services..."
                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium text-gray-800"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gray-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-800 transition"
                    >
                      Submit Mock Review
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Sidebar Control Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm sticky top-24 space-y-6">
            <h3 className="font-extrabold text-lg text-gray-900 border-b border-gray-100 pb-3">
              Book Appointment
            </h3>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3.5 flex items-center">
                <Clock className="h-4 w-4 text-pink-500 mr-1.5" />
                Select Availability Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {salon.slots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                        isSelected
                          ? "bg-pink-50 border-pink-500 text-pink-600 shadow-sm"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Booking Details Preview */}
            {selectedSlot && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-500 space-y-2">
                <span className="font-semibold text-gray-700 block text-[13px]">Selected Booking Details</span>
                <p className="flex justify-between">
                  <span>Salon:</span>
                  <span className="font-bold text-gray-800">{salon.name}</span>
                </p>
                <p className="flex justify-between">
                  <span>Slot Time:</span>
                  <span className="font-bold text-gray-800">{selectedSlot}</span>
                </p>
                <p className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-bold text-gray-800">{salon.location}</span>
                </p>
              </div>
            )}

            {/* Action CTA */}
            <button
              onClick={() => {
                if (!selectedSlot) return;
                router.push(`/book/${salon.id}?slot=${encodeURIComponent(selectedSlot)}`);
              }}
              disabled={!selectedSlot}
              className={`w-full py-4 text-center font-bold rounded-2xl text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md ${
                selectedSlot
                  ? "bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white shadow-pink-500/15 cursor-pointer"
                  : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>{selectedSlot ? "Proceed to Book" : "Select Slot to Book"}</span>
            </button>

            <p className="text-[10px] text-gray-400 text-center font-medium leading-normal">
              No prepayment required! You will pay at the salon venue directly after your treatment session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
