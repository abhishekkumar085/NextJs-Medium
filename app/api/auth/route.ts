import { auth } from '@/firebase/firebaseAdmin';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Create new user
      user = await User.create({
        firebaseUid: uid,
        email,
        name,
        profilePic: picture,
      });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export async function GET() {
  await connectToDatabase();
  const response = await User.find();
  return NextResponse.json(
    {
      success: true,
      response,
    },
    { status: 200 }
  );
}
