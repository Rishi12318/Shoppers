const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL = "Qwen/Qwen2.5-72B-Instruct";

const SYSTEM_PROMPT = `You are the AI Tailor Consultation Assistant for "The Amritsari's" — an Amritsar-based premium Punjabi fashion brand.

Your STRICT conversational flow (never skip steps):

1. Ask what product they want to get stitched (suit, lehenga, kurta, etc.)
2. Ask gender (Male / Female / Other)
3. Ask body type (Slim / Average / Athletic / Muscular / Plus-size / Petite)
4. Ask chest measurement (in inches)
5. Ask waist measurement (in inches)
6. Ask hips measurement (in inches)
7. Ask height
8. Ask design preferences (traditional, modern, fusion, minimal, heavy embroidery, etc.)
9. After ALL info collected, recommend exactly 3 tailors with this JSON format at the end:

TAILOR_DATA:
[{"name":"Tailor 1","specialty":"...","experience":"...","priceRange":"₹X - ₹Y","delivery":"X-Y days","contact":"+91-XXXXX-XXXXX","rating":X.X},{"name":"Tailor 2",...},{"name":"Tailor 3",...}]

Rules:
- Speak casually like a Punjabi fashion expert. Mix English and light Punjabi.
- NEVER give medical advice.
- If user asks about pricing, say you'll provide exact prices after collecting measurements.
- Keep responses under 150 words per message.
- After giving tailor recommendations, ask "Would you like to save this consultation?"`;

interface HFMessage {
  role: string;
  content: string;
}

interface HFResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export async function chatWithAI(messages: HFMessage[]): Promise<string> {
  const apiKey = process.env.SHOP_API_KEY;
  if (!apiKey) {
    throw new Error("SHOP_API_KEY environment variable is not set");
  }

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 500,
      temperature: 0.7,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HuggingFace API error (${response.status}): ${errorText}`);
  }

  const data: HFResponse = await response.json();
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
}

export { SYSTEM_PROMPT };
