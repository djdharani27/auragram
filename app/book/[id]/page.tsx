import { salons } from "@/data/salons";
import BookingClient from "./booking-client";

export function generateStaticParams() {
  return salons.map((s) => ({ id: s.id }));
}

export default function BookingPage() {
  return <BookingClient />;
}
