import { connectToDatabase } from '@/lib/mongodb';
import Comment from '@/models/comments';
import Story from '@/models/story';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

connectToDatabase();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { post, content, user, parentComment, likes, comments, replies } =
      body;

    if (!post || !user || !content) {
      return NextResponse.json(
        {
          success: false,
          message: 'post,content,user cannot be null or empty',
        },
        { status: 400 }
      );
    }
    const story = await Story.findById(post);
    const existingUser = await User.findById(user);
    if (!story) {
      return NextResponse.json(
        { success: false, message: 'Post not found!' },
        { status: 404 }
      );
    }
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'Post not found!' },
        { status: 404 }
      );
    }

    // const newComment = await Comment.create({
    //   post,
    //   content,
    //   user,
    //   parentComment,
    //   likes,
    //   comments,
    //   replies,
    // });

    const newComment = new Comment({
      post,
      content,
      user,
      parentComment,
      likes,
      comments,
      replies,
    });

    await newComment.save();

    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $push: { replies: newComment._id },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Comment Created Successfully!',
        data: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error creting COMMENT', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
}

export async function GET() {
  try {
    const comments = await Comment.find();

    return NextResponse.json(
      {
        success: true,
        message: 'Comment Getting Successfully!',
        data: comments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error getting Comment', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
}
