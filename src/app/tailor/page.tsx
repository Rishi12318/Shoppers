"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Step =
  | "welcome"
  | "gender"
  | "body_type"
  | "chest"
  | "waist"
  | "hips"
  | "height"
  | "preference"
  | "done";

const BODY_TYPES = ["Slim", "Average", "Athletic", "Muscular", "Plus-size", "Petite"];

const TAILORS = [
  {
    name: "Tailor 1",
    specialty: "Traditional Punjabi Embroidery & Phulkari Work",
    experience: "15 years",
    price: "₹1,800 - ₹4,500",
    delivery: "7-10 days",
    contact: "+91-98765-43210",
    rating: "4.8",
  },
  {
    name: "Tailor 2",
    specialty: "Designer Suits, Lehengas & Bridal Wear",
    experience: "12 years",
    price: "₹2,500 - ₹6,000",
    delivery: "10-14 days",
    contact: "+91-98765-12345",
    rating: "4.6",
  },
  {
    name: "Tailor 3",
    specialty: "Custom Stitching & Modern Fusion Wear",
    experience: "8 years",
    price: "₹1,200 - ₹3,500",
    delivery: "5-8 days",
    contact: "+91-98765-67890",
    rating: "4.7",
  },
];

function TailorChat() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "Punjabi Suit";

  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>("welcome");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    gender: "",
    bodyType: "",
    chest: "",
    waist: "",
    hips: "",
    height: "",
    preference: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  useEffect(() => {
    addBotMessage(
      `Welcome to **The Amritsari's** Tailoring Service! 👋\n\nI see you're interested in our **${product}**. I'd love to help you find the perfect custom tailoring.\n\nTo get started, could you please tell me your **gender**?\n\n(Reply: Male / Female / Other)`
    );
    setStep("gender");
  }, []);

  const addBotMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "assistant", content }]);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
  };

  const processInput = async (userInput: string) => {
    addUserMessage(userInput);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

    switch (step) {
      case "gender": {
        const normalized = userInput.toLowerCase().trim();
        if (["male", "m", "man", "boy"].some((w) => normalized.includes(w))) {
          setProfile((p) => ({ ...p, gender: "Male" }));
          addBotMessage(
            `Great! I've noted you as **Male**. 👔\n\nNow, could you describe your **body type**?\n\nReply with one of:\n• Slim\n• Average\n• Athletic\n• Muscular\n• Plus-size\n• Petite`
          );
          setStep("body_type");
        } else if (["female", "f", "woman", "girl"].some((w) => normalized.includes(w))) {
          setProfile((p) => ({ ...p, gender: "Female" }));
          addBotMessage(
            `Wonderful! I've noted you as **Female**. 👗\n\nNow, could you describe your **body type**?\n\nReply with one of:\n• Slim\n• Average\n• Athletic\n• Muscular\n• Plus-size\n• Petite`
          );
          setStep("body_type");
        } else {
          setProfile((p) => ({ ...p, gender: "Other" }));
          addBotMessage(
            `Noted! 🙌\n\nNow, could you describe your **body type**?\n\nReply with one of:\n• Slim\n• Average\n• Athletic\n• Muscular\n• Plus-size\n• Petite`
          );
          setStep("body_type");
        }
        break;
      }

      case "body_type": {
        const matched = BODY_TYPES.find(
          (bt) => userInput.toLowerCase().trim().includes(bt.toLowerCase())
        );
        if (matched) {
          setProfile((p) => ({ ...p, bodyType: matched }));
          addBotMessage(
            `**${matched}** — got it! ✅\n\nNow let's get your measurements for the perfect fit.\n\nWhat is your **Chest / Bust** measurement? (in inches)\n\n*e.g., 38 inches*`
          );
          setStep("chest");
        } else {
          addBotMessage(
            `I didn't quite catch that. Could you pick from these options?\n\n• Slim\n• Average\n• Athletic\n• Muscular\n• Plus-size\n• Petite`
          );
        }
        break;
      }

      case "chest": {
        const num = userInput.replace(/[^0-9.]/g, "");
        if (num && Number(num) > 20 && Number(num) < 60) {
          setProfile((p) => ({ ...p, chest: `${num} inches` }));
          addBotMessage(
            `Chest: **${num} inches** ✅\n\nWhat is your **Waist** measurement? (in inches)\n\n*e.g., 32 inches*`
          );
          setStep("waist");
        } else {
          addBotMessage(
            `Please enter a valid chest measurement in inches (e.g., 38).`
          );
        }
        break;
      }

      case "waist": {
        const num = userInput.replace(/[^0-9.]/g, "");
        if (num && Number(num) > 18 && Number(num) < 55) {
          setProfile((p) => ({ ...p, waist: `${num} inches` }));
          addBotMessage(
            `Waist: **${num} inches** ✅\n\nWhat is your **Hip** measurement? (in inches)\n\n*e.g., 40 inches*`
          );
          setStep("hips");
        } else {
          addBotMessage(`Please enter a valid waist measurement in inches.`);
        }
        break;
      }

      case "hips": {
        const num = userInput.replace(/[^0-9.]/g, "");
        if (num && Number(num) > 22 && Number(num) < 65) {
          setProfile((p) => ({ ...p, hips: `${num} inches` }));
          addBotMessage(
            `Hips: **${num} inches** ✅\n\nAlmost done! What is your **Height**?\n\n*e.g., 5'8" or 173 cm*`
          );
          setStep("height");
        } else {
          addBotMessage(`Please enter a valid hip measurement in inches.`);
        }
        break;
      }

      case "height": {
        if (userInput.trim().length > 1) {
          setProfile((p) => ({ ...p, height: userInput.trim() }));
          addBotMessage(
            `Height: **${userInput.trim()}** ✅\n\nOne last thing — do you have any **special preferences**?\n\n*e.g., Cotton fabric, red color, heavy embroidery, minimal design, wedding wear, casual wear*\n\nOr type **skip** to continue.`
          );
          setStep("preference");
        } else {
          addBotMessage(`Please enter your height (e.g., 5'8" or 173 cm).`);
        }
        break;
      }

      case "preference": {
        const pref = userInput.trim().toLowerCase() === "skip" ? "No special preferences" : userInput.trim();
        const finalProfile = { ...profile, preference: pref };
        setProfile(finalProfile);
        setStep("done");

        addBotMessage(
          `Thank you, **${finalProfile.gender}**! Here's your profile:\n\n` +
            `• Body Type: ${finalProfile.bodyType}\n` +
            `• Chest: ${finalProfile.chest}\n` +
            `• Waist: ${finalProfile.waist}\n` +
            `• Hips: ${finalProfile.hips}\n` +
            `• Height: ${finalProfile.height}\n` +
            `• Preference: ${pref}\n\n` +
            `Based on your measurements for the **${product}**, here are our recommended tailors:\n\n` +
            `---\n\n` +
            TAILORS.map(
              (t) =>
                `**${t.name}**\n` +
                `Specialty: ${t.specialty}\n` +
                `Experience: ${t.experience}\n` +
                `Price Range: ₹${t.price.replace("₹", "")}\n` +
                `Delivery Time: ${t.delivery}\n` +
                `Contact: ${t.contact}\n` +
                `Rating: ⭐ ${t.rating}/5`
            ).join("\n\n---\n\n") +
            `\n\n---\n\n💡 *All prices are indicative and may vary based on final measurements and customization. Contact the tailor directly for a precise quote.*`
        );
        break;
      }

      default:
        break;
    }

    setLoading(false);
  };

  const sendMessage = () => {
    if (!input.trim() || loading || step === "done") return;
    processInput(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#2c1a12]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-[#7b6a59]">$1</em>')
      .replace(/₹([\d,]+)/g, '<span class="font-semibold text-[#d4a574]">₹$1</span>')
      .replace(/⭐/g, '<span class="text-[#d4a574]">⭐</span>')
      .replace(/---/g, '<hr class="my-3 border-[#d9cdbf]" />')
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="flex h-screen flex-col bg-[#fbf9f6]">
      {/* Header */}
      <header className="border-b border-[#d9cdbf] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link href="/shop" className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#7b6a59]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span
              className="text-2xl font-light italic text-[#2c1a12]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The{" "}
              <span className="font-semibold text-[#d4a574]">
                Amritsari&apos;s
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <p
                className="text-xs font-light tracking-widest text-[#7b6a59] uppercase"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Tailoring Consultation
              </p>
              <p
                className="text-[10px] font-light text-[#d4a574]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {product}
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8956a]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#1a0f0a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed sm:max-w-[70%] ${
                  msg.role === "user"
                    ? "bg-[#2c1a12] text-[#e9dfd4] rounded-br-md"
                    : "border border-[#d9cdbf] bg-white text-[#2c1a12] rounded-bl-md shadow-sm"
                }`}
                style={{ fontFamily: "'Jost', sans-serif" }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
              />
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-[#d9cdbf] bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#d4a574]"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#d4a574]"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#d4a574]"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span
                    className="text-xs text-[#7b6a59]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    Typing...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[#d9cdbf] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-end gap-3">
          <div className="flex-1 rounded-2xl border border-[#d9cdbf] bg-[#fbf9f6] px-4 py-3 transition-all focus-within:border-[#d4a574] focus-within:shadow-sm">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                step === "done"
                  ? "Consultation complete!"
                  : "Type your message..."
              }
              rows={1}
              disabled={step === "done"}
              className="w-full resize-none bg-transparent text-sm text-[#2c1a12] placeholder:text-[#7b6a59]/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              style={{ fontFamily: "'Jost', sans-serif" }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading || step === "done"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2c1a12] text-[#e9dfd4] transition-all hover:bg-[#d4a574] hover:text-[#1a0f0a] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
        <p
          className="mt-2 text-center text-[10px] text-[#7b6a59]/50"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          AI-powered tailoring consultation by The Amritsari&apos;s
        </p>
      </div>
    </div>
  );
}

export default function TailorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#fbf9f6]">
          <div className="text-center">
            <div className="mb-4 flex justify-center gap-1">
              <span
                className="h-3 w-3 animate-bounce rounded-full bg-[#d4a574]"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="h-3 w-3 animate-bounce rounded-full bg-[#d4a574]"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="h-3 w-3 animate-bounce rounded-full bg-[#d4a574]"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <p
              className="text-sm text-[#7b6a59]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Loading...
            </p>
          </div>
        </div>
      }
    >
      <TailorChat />
    </Suspense>
  );
}
