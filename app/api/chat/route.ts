import { createGoogle } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { answerFromProfile, buildChatInstructions } from "@/lib/profile";

export const maxDuration = 30;

const MAX_MESSAGE_CHARS = 500;
const MAX_TURNS = 16;
const GEMINI_MODEL = "gemini-3.8-flash";

function geminiApiKey() {
  return process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim() || "";
}

function lastUserText(messages: UIMessage[]) {
  const last = [...messages].reverse().find((message) => message.role === "user");
  if (!last) {
    return "";
  }

  return last.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join(" ")
    .trim();
}

function streamLocalAnswer(text: string) {
  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      const id = "profile-answer";
      writer.write({ type: "text-start", id });
      writer.write({ type: "text-delta", id, delta: text });
      writer.write({ type: "text-end", id });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(request: Request) {
  let messages: UIMessage[] = [];

  try {
    const body = (await request.json()) as { messages?: UIMessage[] };
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (messages.length > MAX_TURNS) {
    return streamLocalAnswer(
      "This chat is getting long. Close it and start a new one, or email Bunkheang from the contact section.",
    );
  }

  const question = lastUserText(messages);

  if (!question) {
    return streamLocalAnswer("Ask a question about HENG Bunkheang and I will answer from his portfolio.");
  }

  if (question.length > MAX_MESSAGE_CHARS) {
    return streamLocalAnswer("Please keep the question under 500 characters so I can stay focused on his profile.");
  }

  const apiKey = geminiApiKey();

  if (!apiKey) {
    return streamLocalAnswer(answerFromProfile(question));
  }

  try {
    const google = createGoogle({ apiKey });
    const result = streamText({
      model: google(GEMINI_MODEL),
      instructions: buildChatInstructions(),
      messages: await convertToModelMessages(messages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch {
    return streamLocalAnswer(answerFromProfile(question));
  }
}
