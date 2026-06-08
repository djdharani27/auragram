"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ShieldCheck, CheckCircle2, User, Phone, ClipboardList, MapPin } from "lucide-react";
import { salons, SalonService, Salon } from "@/data/salons";

// Required for static export
export function generateStaticParams() {
  return salons.map((s) => ({ id: s.id }));
}

function BookingContent() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();

  // Find Salon — merge custom salons from localStorage
  const [salon, setSalon] = useState<Salon | undefined>(salons.find((s) => s.id === id));

  useEffect(() => {
    if (!id) return;
    const customSalons: Salon[] = JSON.parse(localStorage.getItem("custom_salons") || "[]");
    const found = [...salons, ...customSalons].find((s) => s.id === id);
    setSalon(found);
  }, [id]);

  // Read preselected slot from URL query param
  const querySlot = searchParams?.get("slot") || "";

  // Date setup (default: tomorrow)
  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMinDateString = () => {
    return new Date().toISOString().split("T")[0];
  };

  // State Management
  const [bookingDate, setBookingDate] = useState(getTomorrowDateString());
  const [selectedSlot, setSelectedSlot] = useState(querySlot);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Confirmation State
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confCode, setConfCode] = useState("");

  // Sync query slot parameter
  useEffect(() => {
    if (querySlot) {
      setSelectedSlot(querySlot);
    } else if (salon && salon.slots.length > 0) {
      setSelectedSlot(salon.slots[0]);
    }
  }, [querySlot, salon]);

  // Pre-select first service by default
  useEffect(() => {
    if (salon && salon.services.length > 0) {
      setSelectedServices([salon.services[0].name]);
    }
  }, [salon]);

  if (!salon) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-white border border-gray-150 rounded-3xl text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Salon Not Found</h2>
        <p className="text-gray-500 mt-2">The salon you want to book does not exist or has been removed.</p>
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

  // Toggle Service selection
  const handleToggleService = (srvName: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(srvName)) {
        // Prevent deselecting if it's the only service
        if (prev.length === 1) return prev;
        return prev.filter((name) => name !== srvName);
      } else {
        return [...prev, srvName];
      }
    });
  };

  // Compute chosen services list and pricing details
  const chosenServices = salon.services.filter((s) => selectedServices.includes(s.name));
  const totalPrice = chosenServices.reduce((acc, curr) => acc + curr.price, 0);

  // Submit Booking Form
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim() || !selectedSlot) return;

    const code = `AGB-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Save to localStorage
    const newBooking = {
      confirmationId: code,
      salonId: salon.id,
      salonName: salon.name,
      salonLocation: salon.location,
      salonAddress: salon.address,
      date: bookingDate,
      timeSlot: selectedSlot,
      services: chosenServices,
      totalPrice,
      userName,
      userPhone,
      userNotes,
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(localStorage.getItem("my_bookings") || "[]");
    localStorage.setItem("my_bookings", JSON.stringify([newBooking, ...existingBookings]));

    setConfCode(code);
    setIsConfirmed(true);
  };

  // Success Screen Rendering
  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto my-12 px-4 sm:px-6">
        <div className="bg-white border border-gray-150 rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
          {/* Success Checkmark Circle */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 text-emerald-500 mb-6 border border-emerald-100 shadow-md">
            <CheckCircle2 className="h-9 w-9 animate-bounce" />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Booking Confirmed!
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Your appointment has been successfully scheduled. Details are saved locally.
          </p>

          {/* Reference Receipt */}
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-left space-y-4">
            <div className="flex justify-between border-b border-gray-200/50 pb-3">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Confirmation ID</span>
              <span className="font-extrabold text-sm text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                {confCode}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-400">Salon Name:</span>
                <span className="font-bold text-gray-800 text-right">{salon.name}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Date & Time:</span>
                <span className="font-bold text-gray-800 text-right">
                  {bookingDate} at {selectedSlot}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Salon Address:</span>
                <span className="font-medium text-gray-600 max-w-xs text-right">
                  {salon.address}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Customer:</span>
                <span className="font-bold text-gray-800">
                  {userName} ({userPhone})
                </span>
              </p>
            </div>

            {/* Services List summary */}
            <div className="border-t border-gray-200/50 pt-3.5 space-y-2">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Selected Services</span>
              <div className="space-y-1.5">
                {chosenServices.map((s, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>• {s.name} ({s.duration})</span>
                    <span>₹{s.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200/50 pt-3 flex justify-between items-center text-sm">
              <span className="font-bold text-gray-900">Total Price (Pay at Salon):</span>
              <span className="text-lg font-extrabold text-gray-900">₹{totalPrice}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/"
              className="px-6 py-3.5 bg-gray-950 text-white font-bold rounded-2xl hover:bg-gray-800 transition text-sm text-center shadow-sm"
            >
              Go to Homepage
            </Link>
            <Link
              href="/salons"
              className="px-6 py-3.5 bg-gray-50 text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-100 transition text-sm text-center"
            >
              Explore Other Salons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back to details */}
      <Link
        href={`/salon/${salon.id}`}
        className="inline-flex items-center text-sm font-bold text-gray-600 hover:text-pink-600 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Back to {salon.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Booking Form */}
        <form onSubmit={handleSubmitBooking} className="lg:col-span-2 space-y-6">
          {/* User Details */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center mb-1">
              <User className="h-5 w-5 text-pink-500 mr-2" />
              Your Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Priyal Chawla"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Date & Slot selection */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center mb-1">
              <Calendar className="h-5 w-5 text-pink-500 mr-2" />
              Date & Time
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  min={getMinDateString()}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-bold text-gray-800 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Preferred Time Slot
                </label>
                <select
                  required
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-bold text-gray-800 cursor-pointer"
                >
                  {salon.slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Service options selector list */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center mb-1">
              <ClipboardList className="h-5 w-5 text-pink-500 mr-2" />
              Customize Services
            </h2>
            <p className="text-xs text-gray-400 font-semibold uppercase">
              Select one or more services to book (At least one must be checked)
            </p>
            <div className="divide-y divide-gray-100">
              {salon.services.map((srv, index) => {
                const isChecked = selectedServices.includes(srv.name);
                return (
                  <label
                    key={index}
                    className="py-3 flex items-center justify-between cursor-pointer group hover:bg-gray-50/50 px-2 rounded-xl transition"
                  >
                    <div className="flex items-center space-x-3.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleService(srv.name)}
                        className="rounded text-pink-600 border-gray-300 focus:ring-pink-500 h-5 w-5 accent-pink-500 cursor-pointer"
                      />
                      <div>
                        <span className={`text-sm font-bold block ${isChecked ? "text-pink-600" : "text-gray-800"}`}>
                          {srv.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-semibold">{srv.duration}</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-sm text-gray-900">₹{srv.price}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Special Instructions / Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="e.g. Any skin allergies, specific hair length instructions, request for a female stylist..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium text-gray-800"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 text-center bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-extrabold rounded-2xl text-sm transition-all duration-200 shadow-md shadow-pink-500/10 cursor-pointer"
          >
            Confirm Simulated Appointment (Pay at Salon)
          </button>
        </form>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm sticky top-24 space-y-6">
            <h3 className="font-extrabold text-lg text-gray-900 border-b border-gray-100 pb-3">
              Booking Invoice
            </h3>

            {/* Salon mini summary card */}
            <div className="flex space-x-3.5">
              <img
                src={salon.imageUrl}
                alt={salon.name}
                className="w-16 h-16 rounded-2xl object-cover shrink-0 bg-gray-50"
              />
              <div>
                <span className="font-bold text-sm text-gray-900 block line-clamp-1">{salon.name}</span>
                <span className="text-[11px] font-semibold text-gray-400 flex items-center mt-1">
                  <MapPin className="h-3.5 w-3.5 text-pink-500 mr-0.5 shrink-0" />
                  {salon.location}
                </span>
              </div>
            </div>

            {/* Date time details */}
            <div className="border-t border-b border-gray-100 py-4 space-y-2 text-xs text-gray-500">
              <p className="flex justify-between">
                <span>Selected Date:</span>
                <span className="font-bold text-gray-800">{bookingDate}</span>
              </p>
              <p className="flex justify-between">
                <span>Selected Time:</span>
                <span className="font-bold text-gray-800">{selectedSlot}</span>
              </p>
            </div>

            {/* Selected items receipt */}
            <div className="space-y-3">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Chosen Services ({chosenServices.length})</span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {chosenServices.map((srv, index) => (
                  <div key={index} className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>{srv.name}</span>
                    <span className="font-bold text-gray-900">₹{srv.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Block */}
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm">
              <span className="font-bold text-gray-900">Total Price:</span>
              <span className="text-xl font-extrabold text-pink-600">₹{totalPrice}</span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start text-[11px] text-emerald-800 leading-normal font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 shrink-0" />
              <span>Free cancellation up to 4 hours before the booked slot. Pay directly at the salon.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">Loading booking form...</p>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
