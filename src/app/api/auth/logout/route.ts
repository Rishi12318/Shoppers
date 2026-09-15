import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await deleteSession();
    const response = NextResponse.json({ ok: true });
    response.cookies.set("session", "", { maxAge: 0, path: "/" });
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
