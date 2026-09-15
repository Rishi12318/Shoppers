import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

interface Tailor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  priceRange: { min: number; max: number };
  deliveryDays: { min: number; max: number };
  contact: string;
  rating: number;
  location: string;
  available: boolean;
}

interface Consultation {
  id: string;
  product: string;
  gender: string;
  bodyType: string;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    height: string;
  };
  preferences: string;
  recommendedTailors: string[];
  createdAt: string;
}

const DEFAULT_TAILORS: Tailor[] = [
  {
    id: "t1",
    name: "Tailor 1",
    specialty: "Traditional Punjabi Embroidery & Phulkari Work",
    experience: "15 years",
    priceRange: { min: 1800, max: 4500 },
    deliveryDays: { min: 7, max: 10 },
    contact: "+91-98765-43210",
    rating: 4.8,
    location: "Amritsar, Punjab",
    available: true,
  },
  {
    id: "t2",
    name: "Tailor 2",
    specialty: "Designer Suits, Lehengas & Bridal Wear",
    experience: "12 years",
    priceRange: { min: 2500, max: 6000 },
    deliveryDays: { min: 10, max: 14 },
    contact: "+91-98765-12345",
    rating: 4.6,
    location: "Jalandhar, Punjab",
    available: true,
  },
  {
    id: "t3",
    name: "Tailor 3",
    specialty: "Custom Stitching & Modern Fusion Wear",
    experience: "8 years",
    priceRange: { min: 1200, max: 3500 },
    deliveryDays: { min: 5, max: 8 },
    contact: "+91-98765-67890",
    rating: 4.7,
    location: "Ludhiana, Punjab",
    available: true,
  },
  {
    id: "t4",
    name: "Tailor 4",
    specialty: "Sherwanis, Kurta Pajamas & Groom Wear",
    experience: "20 years",
    priceRange: { min: 3000, max: 8000 },
    deliveryDays: { min: 14, max: 21 },
    contact: "+91-98765-11111",
    rating: 4.9,
    location: "Amritsar, Punjab",
    available: true,
  },
  {
    id: "t5",
    name: "Tailor 5",
    specialty: "Casual Wear, Kurtis & Daily Wear Stitching",
    experience: "6 years",
    priceRange: { min: 800, max: 2000 },
    deliveryDays: { min: 3, max: 5 },
    contact: "+91-98765-22222",
    rating: 4.5,
    location: "Patiala, Punjab",
    available: true,
  },
];

// In-memory fallback for local dev without Redis
let memoryConsultations: Consultation[] = [];

// Tailors
export async function getAllTailors(): Promise<Tailor[]> {
  if (redis) {
    const cached = await redis.get<Tailor[]>("tailors");
    if (cached && cached.length > 0) return cached.filter((t) => t.available);
    await redis.set("tailors", DEFAULT_TAILORS);
    return DEFAULT_TAILORS.filter((t) => t.available);
  }
  return DEFAULT_TAILORS.filter((t) => t.available);
}

export async function getTailorById(id: string): Promise<Tailor | undefined> {
  const tailors = await getAllTailors();
  return tailors.find((t) => t.id === id);
}

export async function addTailor(
  tailor: Omit<Tailor, "id">
): Promise<Tailor> {
  const newTailor: Tailor = { ...tailor, id: `t${Date.now()}` };
  if (redis) {
    const tailors = (await redis.get<Tailor[]>("tailors")) || DEFAULT_TAILORS;
    tailors.push(newTailor);
    await redis.set("tailors", tailors);
  }
  return newTailor;
}

// Consultations
export async function addConsultation(
  consultation: Omit<Consultation, "id" | "createdAt">
): Promise<Consultation> {
  const newConsultation: Consultation = {
    ...consultation,
    id: `c${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (redis) {
    const list =
      (await redis.get<Consultation[]>("consultations")) || [];
    list.push(newConsultation);
    await redis.set("consultations", list);
  } else {
    memoryConsultations.push(newConsultation);
  }

  return newConsultation;
}

export async function getConsultations(): Promise<Consultation[]> {
  if (redis) {
    return (await redis.get<Consultation[]>("consultations")) || [];
  }
  return memoryConsultations;
}

export type { Tailor, Consultation };
