import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(20),
});

export const TailorSchema = z.object({
  name: z.string().min(1).max(100),
  specialty: z.string().min(1).max(200),
  experience: z.string().min(1).max(50),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }),
  deliveryDays: z.object({
    min: z.number().min(1),
    max: z.number().min(1),
  }),
  contact: z.string().min(1).max(20),
  rating: z.number().min(0).max(5),
  location: z.string().min(1).max(200),
  available: z.boolean().default(true),
});

export const ConsultationSchema = z.object({
  product: z.string().min(1).max(200),
  gender: z.enum(["male", "female", "other"]),
  bodyType: z.string().min(1).max(50),
  measurements: z.object({
    chest: z.number().min(20).max(200),
    waist: z.number().min(20).max(200),
    hips: z.number().min(20).max(200),
    height: z.string().min(1).max(20),
  }),
  preferences: z.string().min(1).max(1000),
  recommendedTailors: z.array(z.string()).min(1).max(5),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type TailorInput = z.infer<typeof TailorSchema>;
export type ConsultationInput = z.infer<typeof ConsultationSchema>;
