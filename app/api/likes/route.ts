import { connectToDatabase } from '@/lib/mongodb';
import Like from '@/models/likes';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const { user, post, comment } = body;
    if (!user || (!post && !comment)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request.' },
        { status: 400 }
      );
    }

    // check if already liked
    const existingLike = await Like.findOne({
      user: user,
      ...(post ? { post: post } : { comment: comment }),
    });

    if (existingLike) {
      const populatedLike = await Like.findById(existingLike._id);
      // .populate('post')
      // .populate('user')
      // .populate('comment');
      await Like.findByIdAndDelete(existingLike._id);

      return NextResponse.json({
        success: true,
        message: 'Unliked successfully!',
        liked: false,
        data: populatedLike,
      });
    } else {
      const newLike = new Like({
        user,
        post,
        comment,
      });
      await newLike.save();
      return NextResponse.json({
        success: true,
        message: 'Liked successfully!',
        liked: true,
        data: newLike,
        // data: await newLike.populate("post").populate("user").populate("comment"),
      });
    }
  } catch (error) {
    console.log('Error while updating like/unlike', error);
    return NextResponse.json(
      {
        success: false,
        message: 'internal server error',
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get('user');
    const post = searchParams.get('post');
    const comment = searchParams.get('comment');

    if (!user || (!post && !comment)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request.' },
        { status: 400 }
      );
    }

    // Check if already liked
    const existingLike = await Like.findOne({
      user: user,
      ...(post ? { post: post } : { comment: comment }),
    });

    if (existingLike !== null) {
      return NextResponse.json({
        success: true,
        liked: true,
        message: 'Liked successfully!',
        data: existingLike,
      });
    }
    return NextResponse.json({
      success: true,
      liked: false,
      message: 'UnLiked successfully!',
    });

    console.log('Existing Like', existingLike);
  } catch (error) {
    console.log('Error while fetching like/unlike', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error,
      },
      { status: 500 }
    );
  }
}
