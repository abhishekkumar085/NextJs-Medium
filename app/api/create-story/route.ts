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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const posts = await Story.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const countPost = await Story.countDocuments();

    return NextResponse.json(
      {
        success: true,
        message: 'Posts retrieved successfully!',
        data: posts,
        count: countPost,
        currentPage: page,
        totalPages: Math.ceil(countPost / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting posts', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong!',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
