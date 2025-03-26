import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse, NextRequest } from 'next/server';

connectToDatabase();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!params || !id) {
      return NextResponse.json(
        { success: false, error: 'Missing user ID' },
        { status: 400 }
      );
    }
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(
      { success: true, message: 'user getting successfully', data: user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}
