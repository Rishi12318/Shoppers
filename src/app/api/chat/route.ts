import { NextRequest, NextResponse } from "next/server";

const HF_API_KEY = process.env.SHOP_API_KEY;
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

const SYSTEM_PROMPT = `You are a professional tailoring consultant for "The Amritsari's" - a premium Punjabi fashion store. Your job is to help customers find the perfect custom tailoring for their selected garment.

IMPORTANT RULES:
1. First greet the customer and mention the product they selected.
2. Ask for their gender (Male/Female/Other).
3. Ask for their body type (Slim, Average, Athletic, Muscular, Plus-size, Petite).
4. Ask for measurements: Chest/Bust (in inches), Waist (in inches), Hips (in inches), Height (in feet/inches or cm).
5. Ask about any special preferences (fabric choice, color, embroidery style, occasion).
6. AFTER collecting all information, provide exactly 3 tailor recommendations in this EXACT format:

---
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

Note: All prices are indicative and may vary based on final measurements and customization requirements. Contact the tailor directly for a precise quote.
---

Keep responses concise, professional, and warm. Use Indian Rupees (₹) for pricing. Make the tailors sound authentic but use generic names like "Tailor 1", "Tailor 2", "Tailor 3". Do NOT use real people's names.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: formatPrompt(formattedMessages),
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            top_p: 0.9,
            repetition_penalty: 1.1,
            return_full_text: false,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("HF API error:", error);
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const generatedText = data[0]?.generated_text || "";

    return NextResponse.json({ reply: generatedText.trim() });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function formatPrompt(messages: { role: string; content: string }[]): string {
  let prompt = "";
  for (const msg of messages) {
    if (msg.role === "system") {
      prompt += `<s>[INST] ${msg.content}\n\n[/INST]\n`;
    } else if (msg.role === "user") {
      prompt += `<s>[INST] ${msg.content}\n\n[/INST]\n`;
    } else if (msg.role === "assistant") {
      prompt += `${msg.content}</s>\n`;
    }
  }
  return prompt;
}
