import { connectToDatabase } from '@/lib/mongodb';
import Bookmark from '@/models/bookmarks';
import { NextRequest, NextResponse } from 'next/server';

connectToDatabase();

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, post } = body;
    if (!user || !post) {
      return NextResponse.json(
        { success: false, message: 'Invalid request.' },
        { status: 400 }
      );
    }

    const existingBookmark = await Bookmark.findOne({
      user,
      post,
    });

    if (existingBookmark) {
      // Remove the bookmark if it exists
      await Bookmark.findByIdAndDelete(existingBookmark._id);
      return NextResponse.json({
        success: true,
        message: 'Bookmark removed successfully!',
        bookmarked: false,
      });
    } else {
      // Add a new bookmark
      const newBookmark = new Bookmark({ user, post });
      await newBookmark.save();

      return NextResponse.json({
        success: true,
        message: 'Bookmarked successfully!',
        bookmarked: true,
        data: newBookmark,
        // data: await newBookmark.populate('post').populate('user'),
      });
    }
  } catch (error) {
    console.log('Error while add/remove bookmarks', error);
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
