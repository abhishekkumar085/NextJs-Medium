import { auth } from '@/firebase/firebaseAdmin';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user';

import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

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
      user = new User({
        firebaseUid: uid,
        email,
        name,
        profilePic: picture,
      });
      await user.save();
    }

    // set HTTP-Only Cookie with auth token

    const cookie = serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // return NextResponse.json({ user }, { status: 201 });
    return new NextResponse(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    });
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
