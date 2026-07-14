import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // optional filter by type

    const routes = await prisma.transportRoute.findMany({
      where: type ? { type } : undefined,
      include: {
        vehicles: true,
        schedules: {
          where: {
            departure: { gte: new Date() } // only future schedules
          },
          orderBy: { departure: 'asc' }
        }
      }
    });

    return NextResponse.json(routes);
  } catch (error) {
    console.error('Failed to fetch transport routes:', error);
    return NextResponse.json({ error: 'Failed to fetch transport routes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    // For demo purposes, we will support updating a vehicle's status/location or a route's status
    if (action === 'UPDATE_VEHICLE_STATUS') {
      const { vehicleId, status, latitude, longitude } = payload;
      const vehicle = await prisma.transportVehicle.update({
        where: { id: vehicleId },
        data: {
          status,
          ...(latitude !== undefined && { latitude }),
          ...(longitude !== undefined && { longitude }),
          lastUpdated: new Date()
        }
      });
      return NextResponse.json(vehicle);
    } else if (action === 'UPDATE_ROUTE_STATUS') {
      const { routeId, status } = payload;
      const route = await prisma.transportRoute.update({
        where: { id: routeId },
        data: { status }
      });
      return NextResponse.json(route);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Failed to update transport data:', error);
    return NextResponse.json({ error: 'Failed to update transport data' }, { status: 500 });
  }
}
