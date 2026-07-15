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
    console.error("Error fetching alerts, falling back to demo data:", error);
    
    // Demo fallback data if DB is not connected
    const demoAlerts = [
      {
        id: "demo-1",
        title: "Stadium Entry Update",
        message: "Gate 4 is now open for faster entry to the stadium.",
        type: "INFO",
        targetRole: null,
        createdAt: new Date().toISOString()
      },
      {
        id: "demo-2",
        title: "Weather Warning",
        message: "Light rain expected during the second half. Umbrellas are available at kiosk 3.",
        type: "WARNING",
        targetRole: null,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: "demo-3",
        title: "Security Update",
        message: "Please have your Fan ID ready for the next checkpoint.",
        type: "INFO",
        targetRole: "FAN",
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];
    
    return NextResponse.json(demoAlerts);
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
