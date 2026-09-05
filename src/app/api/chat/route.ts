import { NextRequest, NextResponse } from "next/server";

const HF_API_KEY = process.env.SHOP_API_KEY;
const HF_MODEL = "Qwen/Qwen2.5-72B-Instruct";
const HF_URL = "https://router.huggingface.co/v1/chat/completions";

const SYSTEM_PROMPT = `You are a professional tailoring consultant for "The Amritsari's" - a premium Punjabi fashion store based in Amritsar. You help customers find the perfect custom tailoring for their selected garment.

CONVERSATION FLOW (follow this strictly, one step at a time):
1. Greet the customer and mention the product they selected.
2. Ask for their gender (Male/Female/Other).
3. Ask for their body type (Slim, Average, Athletic, Muscular, Plus-size, Petite).
4. Ask for Chest/Bust measurement in inches.
5. Ask for Waist measurement in inches.
6. Ask for Hips measurement in inches.
7. Ask for Height (feet/inches or cm).
8. Ask about special preferences (fabric, color, embroidery, occasion) — or let them skip.
9. After ALL info is collected, provide EXACTLY 3 tailor recommendations.

RULES:
- Ask ONE question at a time. Never skip steps.
- Be warm, professional, and concise (2-3 sentences max per response).
- Use **bold** for important values.
- Use ₹ for prices (Indian Rupees).
- When listing tailors, use this EXACT format:

Based on your measurements, here are our recommended tailors:

**Tailor 1**
Specialty: [specialty]
Experience: [X years]
Price Range: ₹[X,XXX] - ₹[X,XXX]
Delivery Time: [X days/weeks]
Contact: +91-XXXXX-XXXXX
Rating: ⭐ [X.X]/5

**Tailor 2**
Specialty: [specialty]
Experience: [X years]
Price Range: ₹[X,XXX] - ₹[X,XXX]
Delivery Time: [X days/weeks]
Contact: +91-XXXXX-XXXXX
Rating: ⭐ [X.X]/5

**Tailor 3**
Specialty: [specialty]
Experience: [X years]
Price Range: ₹[X,XXX] - ₹[X,XXX]
Delivery Time: [X days/weeks]
Contact: +91-XXXXX-XXXXX
Rating: ⭐ [X.X]/5

Note: All prices are indicative. Contact the tailor for a precise quote.

IMPORTANT: Do NOT use real people's names. Use "Tailor 1", "Tailor 2", "Tailor 3". Tailors should specialize in Punjabi/Indian ethnic wear. Make prices realistic for Indian market (₹1,000-₹8,000 range).`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: HF_MODEL,
        messages: apiMessages,
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("HF API error:", JSON.stringify(data));
      return NextResponse.json(
        { error: data?.error?.message || "AI service error. Please try again." },
        { status: response.status }
      );
    }

    const reply = data.choices?.[0]?.message?.content || "";
    return NextResponse.json({ reply: reply.trim() });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
