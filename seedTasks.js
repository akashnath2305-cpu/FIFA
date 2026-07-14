const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo tasks...");

  const task1 = await prisma.task.create({
    data: {
      title: "Reroute Gate 4B Crowd",
      description: "Gate 4B is reaching critical density. Reroute incoming traffic to Gate 4C and deploy additional staff.",
      status: "PENDING",
      steps: {
        create: [
          { description: "Activate digital signage to redirect incoming fan flow to Gate 4C." },
          { description: "Dispatch 5 available volunteers to Gate 4B to assist with overflow." },
          { description: "Adjust turnstile processing speed." }
        ]
      }
    }
  });

  const task2 = await prisma.task.create({
    data: {
      title: "Optimize Power Grid",
      description: "Initiate eco-mode for the North Quarter to reduce carbon footprint for the next hour.",
      status: "IN_PROGRESS",
      steps: {
        create: [
          { description: "Dim non-essential concourse lighting by 15%.", status: "COMPLETED" },
          { description: "Adjust HVAC thresholds in VIP lounges by +2 degrees.", status: "PENDING" },
          { description: "Verify power grid stabilization.", status: "PENDING" }
        ]
      }
    }
  });

  const task3 = await prisma.task.create({
    data: {
      title: "Resolve Sector 7 Alert",
      description: "Medical incident detected in Sector 7.",
      status: "COMPLETED",
      steps: {
        create: [
          { description: "Dispatch EMT Unit Alpha to the exact location.", status: "COMPLETED" },
          { description: "Secure a clear path via Alley 12.", status: "COMPLETED" },
          { description: "Notify local steward to secure the perimeter.", status: "COMPLETED" }
        ]
      }
    }
  });

  console.log("Demo tasks seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
