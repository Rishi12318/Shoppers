import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export async function hashPassword(password: string): Promise<string> {
  const { createHash } = await import("crypto");
  return createHash("sha256").update(password).digest("hex");
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const { createHash } = await import("crypto");
  return createHash("sha256").update(password).digest("hex") === hash;
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<Omit<User, "passwordHash"> | null> {
  if (!redis) throw new Error("Database not configured");

  const existing = await redis.get<User>(`user:${email}`);
  if (existing) return null;

  const passwordHash = await hashPassword(password);
  const user: User = {
    id: `u${Date.now()}`,
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  await redis.set(`user:${email}`, user);
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<Omit<User, "passwordHash"> | null> {
  if (!redis) throw new Error("Database not configured");

  const user = await redis.get<User>(`user:${email}`);
  if (!user) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

export async function createSession(email: string): Promise<string> {
  if (!redis) throw new Error("Database not configured");

  const sessionId = `s${Date.now()}${Math.random().toString(36).slice(2)}`;
  await redis.set(`session:${sessionId}`, email, { ex: SESSION_TTL });
  return sessionId;
}

export async function getSessionUser(): Promise<Omit<User, "passwordHash"> | null> {
  if (!redis) return null;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  if (!sessionId) return null;

  const email = await redis.get<string>(`session:${sessionId}`);
  if (!email) return null;

  const user = await redis.get<User>(`user:${email}`);
  if (!user) return null;

  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

export async function deleteSession(): Promise<void> {
  if (!redis) return;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  if (sessionId) {
    await redis.del(`session:${sessionId}`);
  }
}
