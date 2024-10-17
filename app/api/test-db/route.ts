import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize the Prisma Client
const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test the connection by querying the database
    const result = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW()`;

    // Send the result back as a JSON response
    return NextResponse.json({
      message: 'Connection successful',
      timestamp: result[0].now,
    });
  } catch (error: unknown) {
    // Log the error
    console.error('Database connection error:', error);

    // Send an error response if something goes wrong
    return NextResponse.json(
      {
        message: 'Database connection failed',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  } finally {
    // Ensure the Prisma client is disconnected
    await prisma.$disconnect();
  }
}