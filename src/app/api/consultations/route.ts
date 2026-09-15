import { NextRequest, NextResponse } from "next/server";
import { getConsultations, addConsultation } from "@/lib/db";
import { ConsultationSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const consultations = await getConsultations();
    return NextResponse.json({ consultations });
  } catch (error) {
    console.error("GET /api/consultations error:", error);
    return NextResponse.json({ error: "Failed to fetch consultations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ConsultationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid consultation data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const consultation = await addConsultation(parsed.data);
    return NextResponse.json({ consultation }, { status: 201 });
  } catch (error) {
    console.error("POST /api/consultations error:", error);
    return NextResponse.json({ error: "Failed to save consultation" }, { status: 500 });
  }
}
