const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding transport data...");
  
  // Clear existing
  await prisma.transportSchedule.deleteMany();
  await prisma.transportVehicle.deleteMany();
  await prisma.transportRoute.deleteMany();

  // Create Routes
  const r1 = await prisma.transportRoute.create({
    data: {
      name: "Stadium Express - Red Line",
      type: "BUS",
      startLoc: "Downtown Central",
      endLoc: "MetLife Gate B",
      status: "ACTIVE"
    }
  });

  const r2 = await prisma.transportRoute.create({
    data: {
      name: "USA Team Convoy",
      type: "VIP_CONVOY",
      startLoc: "Grand Hotel",
      endLoc: "MetLife VIP Entrance",
      status: "ACTIVE"
    }
  });

  const r3 = await prisma.transportRoute.create({
    data: {
      name: "FanZone Shuttle - Blue Line",
      type: "SHUTTLE",
      startLoc: "Centennial Park",
      endLoc: "MetLife Gate A",
      status: "DELAYED"
    }
  });

  // Create Schedules
  const now = new Date();
  await prisma.transportSchedule.create({
    data: {
      routeId: r1.id,
      departure: new Date(now.getTime() + 15 * 60000), // 15 mins from now
      arrival: new Date(now.getTime() + 45 * 60000)
    }
  });

  await prisma.transportSchedule.create({
    data: {
      routeId: r3.id,
      departure: new Date(now.getTime() + 5 * 60000),
      arrival: new Date(now.getTime() + 25 * 60000)
    }
  });

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
