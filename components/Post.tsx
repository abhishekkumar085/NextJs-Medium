"use client"
import { useFetchPost } from "@/hooks/Apis/useFetchPost";
import Link from "next/link";
import React from "react";

const Post = () => {
    const { posts, loading } = useFetchPost();

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
            <div className="space-y-6">
                {posts.map((post: { _id: string; title: string; description: string }) => (
                    <div key={post._id} className="border-b pb-4">
                        <h2 className="text-xl font-semibold">
                            <Link href={`/dashboard/${post._id}`} className="hover:underline">
                                {post.title}
                            </Link>
                        </h2>

                        <p className="text-gray-600">
                            {post.description.replace(/<[^>]*>/g, "").substring(0, 100)}...
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Post;
