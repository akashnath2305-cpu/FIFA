const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding more demo tasks...");

  await prisma.task.create({
    data: {
      title: "VIP Lounge Restock",
      description: "Beverage stations in Platinum Lounge C are running below 20% capacity.",
      status: "PENDING",
      steps: {
        create: [
          { description: "Deploy restock cart from Storage 3." },
          { description: "Refresh all ice stations and garnish trays." },
          { description: "Verify inventory count with Lounge Manager." }
        ]
      }
    }
  });

  await prisma.task.create({
    data: {
      title: "Field Sprinkler Calibration",
      description: "Pre-match pitch watering sequence needs verification for Zone 2.",
      status: "IN_PROGRESS",
      steps: {
        create: [
          { description: "Test pressure levels on all Zone 2 valves.", status: "COMPLETED" },
          { description: "Execute 30-second test cycle.", status: "PENDING" },
          { description: "Log moisture readings in the central database.", status: "PENDING" }
        ]
      }
    }
  });

  await prisma.task.create({
    data: {
      title: "Press Conference Audio Check",
      description: "Ensure all microphones and translation headsets are functional in the Main Media Room.",
      status: "PENDING",
      steps: {
        create: [
          { description: "Test primary and backup microphones at the podium." },
          { description: "Verify frequency channels for translator headsets." },
          { description: "Confirm audio feed with external broadcast truck." }
        ]
      }
    }
  });

  await prisma.task.create({
    data: {
      title: "Merchandise Stand D Crowd Control",
      description: "Queue for the official store is spilling into the main concourse walkways.",
      status: "IN_PROGRESS",
      steps: {
        create: [
          { description: "Deploy retractable barriers to zig-zag the queue.", status: "COMPLETED" },
          { description: "Assign 2 stewards to guide fans to the end of the line.", status: "COMPLETED" },
          { description: "Open 2 additional express checkout registers.", status: "PENDING" }
        ]
      }
    }
  });

  console.log("More demo tasks seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
