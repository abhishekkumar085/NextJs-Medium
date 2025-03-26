import { connectToDatabase } from '@/lib/mongodb';
import Story from '@/models/story';
import User from '@/models/user';
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
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const post = await Story.find({ userId: id }).populate(
      'userId',
      'name email'
    );
    const countPost = await Story.countDocuments({ userId: id });
    console.log('COUNTPOSTS', countPost);
    if (!post)
      return NextResponse.json(
        { error: 'Post not found by associated user' },
        { status: 404 }
      );
    return NextResponse.json(
      {
        success: true,
        message: 'post getting successfully',
        data: post,
        count: countPost,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error while getting post by user id : ', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}
