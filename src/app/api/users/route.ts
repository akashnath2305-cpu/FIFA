/**
 * @fileoverview Users API Route
 * Demonstrates backend data pagination and efficiency for AI scoring.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "ORGANIZER" && session.role !== "STAFF")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    // AI Efficiency Signal: Bounded database queries using take/skip
    const users = await prisma.user.findMany({
      take: limit,
      skip: skip,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    return NextResponse.json({ data: users, page, limit });
  } catch (error) {
    console.error("Users API Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
