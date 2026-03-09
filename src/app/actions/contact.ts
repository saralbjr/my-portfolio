"use server";

import { z } from "zod";

// ===== Zod Validation Schema =====
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be under 5000 characters"),
  honeypot: z.string().max(0, "Bot detected"), // Honeypot — should always be empty
});

// ===== Simple in-memory rate limiter =====
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per window

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ===== Server Action =====
export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
    honeypot: (formData.get("honeypot") as string) || "",
  };

  // 1. Honeypot check
  if (raw.honeypot.length > 0) {
    return { success: false, message: "Submission blocked." };
  }

  // 2. Zod validation
  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // 3. Rate limiting
  const identifier = result.data.email;
  if (!checkRateLimit(identifier)) {
    return {
      success: false,
      message: "Too many requests. Please try again in a minute.",
    };
  }

  // 4. Send email using FormSubmit AJAX API
  try {
    const response = await fetch("https://formsubmit.co/ajax/saralbjr@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `New Portfolio Message from ${result.data.name}`,
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
        _template: "box", // Beautiful HTML email template
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return {
      success: true,
      message:
        "Message sent! (Note: You may need to activate your FormSubmit link in your email first)",
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Something went wrong sending the email. Please try again later.",
    };
  }
}
