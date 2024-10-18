import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const auth0Id = searchParams.get('auth0Id');

    // Check the request has the right params
    if (!auth0Id) {
      return NextResponse.json(
        { message: 'auth0Id query parameter is required.' },
        { status: 400 }
      );
    }

    // Grab the hoodie data from the db
    const userWithHoodies = await prisma.user.findUnique({
      where: { auth0Id },
      include: { hoodieDesigns: true },
    });

    // Verify that the user exists
    if (!userWithHoodies) {
      return NextResponse.json(
        { message: 'User not found.', designs: [] },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Designs fetched successfully.',
      designs: userWithHoodies.hoodieDesigns,
    });
  } catch (error: unknown) {
    console.error('Error fetching designs:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch designs.',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}