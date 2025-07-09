"use client";

import { useState } from "react";

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/ask-speedy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 max-w-md mx-auto space-y-6 text-gray-800">
      <h1 className="text-2xl font-bold text-center">🧠 Ask Speedy</h1>
      <p className="text-sm text-center text-gray-500">
        Describe what you saw and Speedy will help you identify it.
      </p>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: A red battery symbol came on while driving"
        className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
        rows={4}
      />

      <button
        onClick={handleAsk}
        disabled={loading || !question.trim()}
        className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-full hover:bg-yellow-500 transition"
      >
        {loading ? "Thinking..." : "Ask Speedy AI"}
      </button>

      {answer && (
        <div className="border rounded p-4 bg-gray-50 text-sm whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </main>
  );
}
