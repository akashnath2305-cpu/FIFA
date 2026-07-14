/**
 * @fileoverview Registration API Route
 * Provides secure user signup with strict Zod payload validation and password hashing.
 * 
 * @security
 * - Prevents NoSQL/SQL injection via schema validation
 * - Passwords are symmetrically hashed using bcrypt with salt rounds
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { LRUCache } from "lru-cache";
import { signupSchema } from "@/lib/validations/auth";
import { encrypt, SESSION_COOKIE } from "@/lib/auth";

const rateLimit = new LRUCache({
  max: 500,
  ttl: 15 * 60 * 1000, // 15 minutes
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const tokenCount = (rateLimit.get(ip) as number[]) || [0];
    if (tokenCount[0] >= 5) {
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
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password, name, role } = validation.data;


    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role || "FAN",
      },
    });

    // Create JWT token
    const sessionToken = await encrypt({ id: newUser.id, role: newUser.role as any });

    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      },
      { status: 201 }
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
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
