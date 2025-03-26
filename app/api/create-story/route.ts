import { connectToDatabase } from '@/lib/mongodb';
import Story from '@/models/story';
import { NextRequest, NextResponse } from 'next/server';

connectToDatabase();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      userId,
      coverImage,
      likes,
      comments,
      bookmarks,
      tags,
    } = body;

    if (!title || !description || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'title,description,userId cannot be null or empty',
        },
        { status: 400 }
      );
    }

    const newPost = await Story.create({
      title,
      description,
      userId,
      coverImage,
      likes,
      comments,
      bookmarks,
      tags,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Post Created Successfully!',
        data: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error creting POST', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
}

export async function GET() {
  try {
    const posts = await Story.find();
    const countPost = await Story.countDocuments({});
    console.log('Total Posts', countPost);

    return NextResponse.json(
      {
        success: true,
        message: 'Post Getting Successfully!',
        data: posts,
        count: countPost,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error getting POST', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
}
