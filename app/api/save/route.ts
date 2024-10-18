import { NextResponse } from 'next/server';
import { generateRandomColour } from '@/utils/colour';
import prisma from '@/lib/prisma';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const { auth0Id, hoodie } = body;

    // Basic validation
    if (!auth0Id || !hoodie) {
      return NextResponse.json(
        { message: 'Invalid request data. auth0Id are required.' },
        { status: 400 }
      );
    }

    // Find or create the user based on their auth0Id
    const user = await prisma.user.upsert({
      where: { auth0Id },
      update: {}, // Don't update if they already exist
      create: {
        auth0Id,
      },
    });

    // Create a random colour for the design. 
    // Ideally this would be a render of the hoodie but is out of scope for this project
    const colour = generateRandomColour();

    // Create the hoodie and link it to the user
    const savedHoodie = await prisma.hoodie.create({
      data: {
        userId: user.id,
        torsoFront: hoodie.torsoFront,
        torsoBack: hoodie.torsoBack,
        torsoBand: hoodie.torsoBand,
        leftSleeve: hoodie.leftSleeve,
        rightSleeve: hoodie.rightSleeve,
        leftCuff: hoodie.leftCuff,
        rightCuff: hoodie.rightCuff,
        hood: hoodie.hood,
        color: colour,
      },
    });

    return NextResponse.json({
      message: 'Design saved successfully',
      hoodie: savedHoodie,
    });
  } catch (error: unknown) {
    console.error('Error saving design:', error);
    return NextResponse.json(
      {
        message: 'Failed to save design',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}