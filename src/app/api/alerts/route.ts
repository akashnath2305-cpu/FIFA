import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    // Fetch alerts where targetRole is null (broadcast to all) OR matches the user's role
    const alerts = await prisma.alert.findMany({
      where: {
        OR: [
          { targetRole: null },
          { targetRole: role || undefined }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limit to 50 latest alerts
    });

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, type, targetRole } = body;

    const newAlert = await prisma.alert.create({
      data: {
        title,
        message,
        type: type || "INFO",
        targetRole: targetRole === "ALL" ? null : targetRole,
      }
    });

    return NextResponse.json(newAlert, { status: 201 });
  } catch (error) {
    console.error("Error creating alert:", error);
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 });
  }
}
