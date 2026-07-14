import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        steps: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(tasks);
  } catch (error: unknown) {
    console.error("Tasks API GET error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, steps } = body;

    if (!title || !description || !steps || !Array.isArray(steps)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        steps: {
          create: steps.map((stepDesc: string) => ({
            description: stepDesc,
          })),
        },
      },
      include: {
        steps: true,
      }
    });

    return NextResponse.json(task);
  } catch (error: unknown) {
    console.error("Tasks API POST error:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
