"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../../components/Sidebar";

const suggestedQuestions = [
  "My check engine light came on — what should I do?",
  "The battery warning light is flashing while driving",
  "I hear a grinding noise when I brake",
  "My car is overheating — is it safe to keep driving?",
  "Oil pressure light turned on and off briefly",
  "TPMS light is on but my tires look fine",
];

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const handleAsk = async (q?: string) => {
    const queryText = q || question;
    if (!queryText.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");
    setHasAsked(true);
    if (q) setQuestion(q);

    try {
      const res = await fetch("/api/ask-speedy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: queryText }),
      });
      if (!res.ok) throw new Error("Failed to get a response");
      const data = await res.json();
      setAnswer(data.answer);
    } catch {
      setError("Speedy couldn't connect right now. Please check your API configuration and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [answer]);

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 flex items-center px-6 lg:px-8 py-4 border-b border-zinc-900">
          <div className="pl-12 lg:pl-0">
            <span className="text-sm font-medium text-zinc-400">Ask Speedy AI</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">

            {/* Intro — shown before first question */}
            <AnimatePresence>
              {!hasAsked && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">Ask Speedy</h2>
                  <p className="text-sm text-zinc-500 max-w-sm">
                    Describe what you are seeing or hearing in plain language. Speedy will help you understand what it means.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Answer display */}
            <AnimatePresence>
              {(loading || answer || error) && (
                <motion.div
                  ref={answerRef}
                  key="answer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mb-5"
                >
                  {/* Question echo */}
                  {hasAsked && question && (
                    <div className="flex justify-end mb-3">
                      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tr-md px-4 py-3 max-w-sm">
                        <p className="text-sm text-zinc-300">{question}</p>
                      </div>
                    </div>
                  )}

                  {/* Response bubble */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-md px-5 py-4">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-zinc-600"
                              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                        <span className="text-zinc-600 text-xs">Speedy is thinking...</span>
                      </div>
                    ) : error ? (
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{answer}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-zinc-600 transition-colors">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you're seeing... e.g. 'A red battery warning light came on while I was driving on the highway'"
                className="w-full bg-transparent px-5 pt-4 pb-2 text-sm text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none"
                rows={3}
                disabled={loading}
              />
              <div className="flex items-center justify-between px-4 pb-3">
                <p className="text-[10px] text-zinc-700">Enter to send · Shift+Enter for new line</p>
                <button
                  onClick={() => handleAsk()}
                  disabled={!question.trim() || loading}
                  className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-900 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  {loading ? (
                    <>
                      <motion.div
                        className="w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Thinking...
                    </>
                  ) : (
                    <>
                      Ask Speedy
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Suggested questions */}
            {!hasAsked && (
              <div className="mt-5">
                <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">Try asking</p>
                <div className="space-y-1.5">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleAsk(q)}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 rounded-xl text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-zinc-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[11px] text-zinc-700 text-center mt-8 leading-relaxed">
              Speedy provides general guidance only. Always consult a qualified mechanic for critical issues or safety concerns.
            </p>

            <div className="pb-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
