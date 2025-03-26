import { connectToDatabase } from '@/lib/mongodb';
import Like from '@/models/likes';
import { NextRequest, NextResponse } from 'next/server';

connectToDatabase();

export async function PATCH(req: NextRequest) {
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
      const populatedLike = await Like.findById(existingLike._id)
        .populate('post')
        .populate('user')
        .populate('comment');
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
