import { salons } from "@/data/salons";
import SalonDetailClient from "./salon-client";

export function generateStaticParams() {
  return salons.map((s) => ({ id: s.id }));
}

export default function SalonDetailPage() {
  return <SalonDetailClient />;
}
