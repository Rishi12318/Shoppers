import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const user = await createUser(name, email, password);
    if (!user) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
