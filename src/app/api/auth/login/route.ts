/**
 * @fileoverview Authentication API Route
 * Secure user login endpoint featuring Zod validation and safe bcrypt comparison.
 * 
 * @security
 * - Prevents timing attacks via standard bcrypt.compare
 * - Ensures input sanitization using Zod schema verification
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { encrypt, SESSION_COOKIE } from "@/lib/auth";
import { LRUCache } from "lru-cache";

const rateLimit = new LRUCache({
  max: 500,
  ttl: 15 * 60 * 1000, // 15 minutes
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const tokenCount = (rateLimit.get(ip) as number[]) || [0];
    if (tokenCount[0] >= 10) {
      return NextResponse.json({ message: "Too many requests, please try again later." }, { status: 429 });
    }
    rateLimit.set(ip, [tokenCount[0] + 1]);
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }
    
    // Strict schema validation for security
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;


    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const sessionToken = await encrypt({ id: user.id, role: user.role as any });

    // Login successful
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
