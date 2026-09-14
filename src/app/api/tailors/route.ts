import { NextRequest, NextResponse } from "next/server";
import { getAllTailors, addTailor } from "@/lib/db";
import { TailorSchema } from "@/lib/validators";

export async function GET() {
  try {
    const tailors = getAllTailors();
    return NextResponse.json({ tailors });
  } catch (error) {
    console.error("GET /api/tailors error:", error);
    return NextResponse.json({ error: "Failed to fetch tailors" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = TailorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid tailor data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const tailor = addTailor(parsed.data);
    return NextResponse.json({ tailor }, { status: 201 });
  } catch (error) {
    console.error("POST /api/tailors error:", error);
    return NextResponse.json({ error: "Failed to create tailor" }, { status: 500 });
  }
}
