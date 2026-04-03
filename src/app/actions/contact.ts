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

// ===== Improved in-memory rate limiter =====
// Note: In production, consider using Upstash Redis for serverless deployments
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour window (per email)
const RATE_LIMIT_MAX = 5; // max 5 messages per hour from same email

function checkRateLimit(identifier: string): { success: boolean; timeRemaining?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { success: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const timeRemaining = Math.ceil((entry.resetTime - now) / (60 * 1000));
    return { success: false, timeRemaining };
  }

  entry.count++;
  return { success: true };
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

  // 1. Honeypot check (Bot protection)
  if (raw.honeypot.length > 0) {
    return { success: false, message: "Spam detected. Submission blocked." };
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

  // 3. User-specific Rate Limiting (Abuse prevention)
  const identifier = result.data.email.toLowerCase();
  const limit = checkRateLimit(identifier);
  if (!limit.success) {
    return {
      success: false,
      message: `Too many submissions. Please wait ${limit.timeRemaining} minutes before trying again.`,
    };
  }

  // 4. Send email using Resend (Professional Free Email Platform)
  const apiKey = process.env.RESEND_API_KEY?.trim();
  
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY");
    return {
      success: false,
      message: "Server configuration error. Please try again later.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: "saralbjr@gmail.com",
        reply_to: result.data.email,
        subject: `New Message from Portfolio: ${result.data.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <h2 style="color: #3b82f6;">New Portfolio Message</h2>
            <p><strong>From:</strong> ${result.data.name} (${result.data.email})</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 10px;">
              <p style="white-space: pre-wrap; font-size: 16px;">${result.data.message}</p>
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
              Sent from your portfolio website.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API Error:", errorData);
      throw new Error("Resend failed");
    }

    return {
      success: true,
      message: "Message received! I'll get back to you as soon as possible.",
    };
    
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Oops! Technical difficulty sending your message. Please try my social links below.",
    };
  }
}
