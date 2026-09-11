import { site } from "@/lib/site";
import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { type: "danger", message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const subject = body.subject?.trim() || `Portfolio message from ${name}`;
  const message = body.message?.trim() || "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { type: "danger", message: "Please fill in your name, email, and message." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { type: "danger", message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  )}`;

  return NextResponse.json({
    type: "success",
    message: "Thanks. Your email client will open so you can send the message.",
    mailto,
  });
}
