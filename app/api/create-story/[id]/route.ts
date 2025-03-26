import { connectToDatabase } from '@/lib/mongodb';
import Story from '@/models/story';
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
    const post = await Story.findById(id);
    if (!post)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json(
      { success: true, message: 'Post Getting successfully', data: post },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error while getting posts', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}
