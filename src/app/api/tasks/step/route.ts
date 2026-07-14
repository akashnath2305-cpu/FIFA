import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { stepId, status } = body;

    if (!stepId || !status) {
      return NextResponse.json({ error: "Missing stepId or status" }, { status: 400 });
    }

    // Update the step status
    const updatedStep = await prisma.taskStep.update({
      where: { id: stepId },
      data: { status },
    });

    // Check all steps for this task to update parent task status
    const allSteps = await prisma.taskStep.findMany({
      where: { taskId: updatedStep.taskId },
    });

    const completedSteps = allSteps.filter(s => s.status === "COMPLETED").length;
    let taskStatus = "PENDING";
    
    if (completedSteps === allSteps.length && allSteps.length > 0) {
      taskStatus = "COMPLETED";
    } else if (completedSteps > 0) {
      taskStatus = "IN_PROGRESS";
    }

    const updatedTask = await prisma.task.update({
      where: { id: updatedStep.taskId },
      data: { status: taskStatus },
      include: { steps: true }
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating step:", error);
    return NextResponse.json({ error: "Failed to update step" }, { status: 500 });
  }
}
