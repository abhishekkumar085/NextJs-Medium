import { connectToDatabase } from '@/lib/mongodb';
import Like from '@/models/likes';
import { NextRequest, NextResponse } from 'next/server';

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

    const postLikes = await Like.countDocuments({ post: id });

    return NextResponse.json(
      { success: true, data: postLikes },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error while getting Likes', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}
