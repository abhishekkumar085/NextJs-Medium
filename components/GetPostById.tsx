"use client";
import { useGetpostById } from "@/hooks/Apis/useGetpostById";
import DOMPurify from "dompurify";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";

export const GetPostById = ({ id }: { id: string }) => {
    const { post, loading } = useGetpostById(id);

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <LucideLoader2 className="animate-spin ml-2 text-center" />
        </div>
    );
    if (!post) return <p className="text-center text-red-500">Post not found</p>;

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-500">Published on: {post.createdAt ? new Date(post.createdAt).toDateString() : "Unknown"}</p>
            <div className="mt-6 border-b pb-6">
                <Link href="/dashboard" className="text-blue-500 hover:underline">← Back to home</Link>
            </div>
            {/* Render Quill-formatted HTML safely */}
            <div className="mt-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description || "") }} />
        </div>
    );
};
