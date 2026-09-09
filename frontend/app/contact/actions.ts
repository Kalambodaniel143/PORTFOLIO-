"use server";

import { sendContactMessage } from "@/lib/api";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Honeypot — real users never fill this hidden field.
  const trap = String(formData.get("company") ?? "").trim();

  if (trap) return { status: "success" };

  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return {
      status: "error",
      message: "Your message is a little short — tell me a bit more.",
    };
  }

  const result = await sendContactMessage({ name, email, message });
  if (!result.ok) {
    return {
      status: "error",
      message: result.error ?? "Something went wrong. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Thanks — your message has been sent. I'll get back to you soon.",
  };
}
