import { connectToDatabase } from '@/lib/mongodb';
import Comment from '@/models/comments';
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
    const comments = await Comment.find({
      post: id,
      parentComment: null,
    })
      .populate('post')
      .populate('user')
      .populate({
        path: 'replies',
        populate: { path: 'user' },
      });
    if (!comments)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json(
      { success: true, message: 'Post Getting successfully', data: comments },
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
