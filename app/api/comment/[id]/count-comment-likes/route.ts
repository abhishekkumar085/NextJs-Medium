import { connectToDatabase } from '@/lib/mongodb';
import Comment from '@/models/comments';
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

    const comment = await Comment.findById(id);
    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'comment not found!' },
        { status: 400 }
      );
    }

    const commentLikes = await Like.countDocuments({ comment: id });

    return NextResponse.json(
      { success: true, data: commentLikes },
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
