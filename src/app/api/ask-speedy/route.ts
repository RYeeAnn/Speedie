import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const question = body.question;

  if (!question) {
    return NextResponse.json({ error: "No question provided" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Speedy, a friendly car assistant that explains warning lights in simple terms.",
          },
          { role: "user", content: question },
        ],
        temperature: 0.6,
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    return NextResponse.json({ answer: data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from OpenAI" },
      { status: 500 }
    );
  }
}
