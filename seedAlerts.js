const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo alerts...");

  await prisma.alert.create({
    data: {
      title: "Heavy Traffic Detected",
      message: "Traffic near the North Gate is getting heavy. If you leave your hotel in the next 10 minutes, you'll make it for the pre-game show.",
      type: "WARNING",
      targetRole: "FAN",
    }
  });

  await prisma.alert.create({
    data: {
      title: "VIP Lounge C Overcapacity",
      message: "VIP Lounge C has exceeded optimal capacity. Please prepare overflow Lounge D.",
      type: "CRITICAL",
      targetRole: "STAFF",
    }
  });

  await prisma.alert.create({
    data: {
      title: "System Update Complete",
      message: "The stadium operating system has been updated to version 2.4. All sub-systems nominal.",
      type: "INFO",
      targetRole: null, // Broadcast to all
    }
  });

  console.log("Alerts seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
