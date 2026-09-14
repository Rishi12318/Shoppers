import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const DB_FILE = join(DATA_DIR, "db.json");

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

interface DB {
  tailors: Tailor[];
  consultations: Consultation[];
}

const DEFAULT_DB: DB = {
  tailors: [
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
  ],
  consultations: [],
};

function getDB(): DB {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(DB_FILE)) {
    writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2));
    return DEFAULT_DB;
  }
  return JSON.parse(readFileSync(DB_FILE, "utf-8"));
}

function saveDB(db: DB): void {
  writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// Tailors
export function getAllTailors(): Tailor[] {
  return getDB().tailors.filter((t) => t.available);
}

export function getTailorById(id: string): Tailor | undefined {
  return getDB().tailors.find((t) => t.id === id);
}

export function addTailor(tailor: Omit<Tailor, "id">): Tailor {
  const db = getDB();
  const newTailor: Tailor = {
    ...tailor,
    id: `t${Date.now()}`,
  };
  db.tailors.push(newTailor);
  saveDB(db);
  return newTailor;
}

export function updateTailor(id: string, updates: Partial<Tailor>): Tailor | null {
  const db = getDB();
  const index = db.tailors.findIndex((t) => t.id === id);
  if (index === -1) return null;
  db.tailors[index] = { ...db.tailors[index], ...updates };
  saveDB(db);
  return db.tailors[index];
}

export function deleteTailor(id: string): boolean {
  const db = getDB();
  const index = db.tailors.findIndex((t) => t.id === id);
  if (index === -1) return false;
  db.tailors.splice(index, 1);
  saveDB(db);
  return true;
}

// Consultations
export function addConsultation(consultation: Omit<Consultation, "id" | "createdAt">): Consultation {
  const db = getDB();
  const newConsultation: Consultation = {
    ...consultation,
    id: `c${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  db.consultations.push(newConsultation);
  saveDB(db);
  return newConsultation;
}

export function getConsultations(): Consultation[] {
  return getDB().consultations;
}

export type { Tailor, Consultation };
