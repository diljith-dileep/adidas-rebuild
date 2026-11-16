import { NextResponse } from "next/server";

// In-memory store for demo purposes.
// Replace with a database insert or email service integration (e.g. Prisma, Supabase, Resend) here.
const leads: Array<{
  name: string;
  email: string;
  age: number;
  submittedAt: string;
}> = [];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const age = Number(body.age);
    const submittedAt =
      typeof body.submittedAt === "string" ? body.submittedAt : new Date().toISOString();

    if (name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!Number.isInteger(age) || age < 1 || age > 120) {
      return NextResponse.json({ error: "Age must be a whole number from 1 to 120." }, { status: 400 });
    }

    const lead = { name, email, age, submittedAt };
    leads.push(lead);
    console.log("Lead captured:", lead);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
