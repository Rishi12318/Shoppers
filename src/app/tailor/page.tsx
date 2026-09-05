"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BODY_TYPES = ["Slim", "Average", "Athletic", "Muscular", "Plus-size", "Petite"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];

function getQuickReplies(lastMessage: string): string[] | null {
  const lower = lastMessage.toLowerCase();
  if (lower.includes("gender")) return GENDER_OPTIONS;
  if (lower.includes("body type")) return BODY_TYPES;
  return null;
}

function TailorChat() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "Punjabi Suit";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
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
  }, [loading]);

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    const greetUser = async () => {
      const systemContext = `The customer is interested in: ${product}. This is the start of the conversation.`;
      const greeting: Message = {
        role: "assistant",
        content: `Welcome to **The Amritsari's** Tailoring Service! 👋\n\nI see you're interested in our **${product}**. I'd love to help you find the perfect custom tailoring.\n\nTo get started, could you please tell me your **gender**? (Male / Female / Other)`,
      };
      setMessages([greeting]);
    };

    greetUser();
  }, [product, initialized]);

  const processInput = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: data.error || "Sorry, something went wrong. Please try again.",
          },
        ]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Network error. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    processInput(input);
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
                    AI Tailor is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Replies */}
      {!loading && messages.length > 0 && (() => {
        const lastBot = [...messages].reverse().find((m) => m.role === "assistant");
        if (!lastBot) return null;
        const replies = getQuickReplies(lastBot.content);
        if (!replies) return null;
        return (
          <div className="border-t border-[#d9cdbf]/50 bg-white/50 px-4 py-3">
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
              {replies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => processInput(reply)}
                  className="rounded-full border border-[#d9cdbf] bg-white px-5 py-2 text-sm font-light tracking-wide text-[#2c1a12] transition-all duration-200 hover:border-[#d4a574] hover:bg-[#2c1a12] hover:text-[#e9dfd4]"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Input Area */}
      <div className="border-t border-[#d9cdbf] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-end gap-3">
          <div className="flex-1 rounded-2xl border border-[#d9cdbf] bg-[#fbf9f6] px-4 py-3 transition-all focus-within:border-[#d4a574] focus-within:shadow-sm">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full resize-none bg-transparent text-sm text-[#2c1a12] placeholder:text-[#7b6a59]/50 focus:outline-none"
              style={{ fontFamily: "'Jost', sans-serif" }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
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
