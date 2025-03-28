import { notFound } from "next/navigation";
import DOMPurify from "dompurify";
import Link from "next/link";


export const GetPostById = async ({ id }: { id: string }) => {
    const res = await fetch(`api/create-story/${id}`);
    if (!res.ok) return notFound();
    const post = await res.json();

    return (
        <div>
            <div className="max-w-3xl mx-auto py-10">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <p className="text-gray-500">Published on: {new Date(post.createdAt).toDateString()}</p>
                <div className="mt-6 border-b pb-6">
                    <Link href="/dashboard" className="text-blue-500 hover:underline">← Back to home</Link>
                </div>
                {/* Render Quill-formatted HTML safely */}
                <div className="mt-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
            </div>
        </div>
    )
};

