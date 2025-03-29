// "use client";
// import { useGetpostById } from "@/hooks/Apis/useGetpostById";
// import DOMPurify from "dompurify";
// import { LucideLoader2 } from "lucide-react";
// import Link from "next/link";

// export const GetPostById = ({ id }: { id: string }) => {
//     const { post, loading } = useGetpostById(id);

//     if (loading) return (
//         <div className="flex h-screen items-center justify-center">
//             <LucideLoader2 className="animate-spin ml-2 text-center" />
//         </div>
//     );
//     if (!post) return <p className="text-center text-red-500">Post not found</p>;

//     return (
//         <div className="max-w-3xl mx-auto py-10">
//             <h1 className="text-3xl font-bold">{post.title}</h1>
//             <p className="text-gray-500">Published on: {post.createdAt ? new Date(post.createdAt).toDateString() : "Unknown"}</p>
//             <div className="mt-6 border-b pb-6">
//                 <Link href="/dashboard" className="text-blue-500 hover:underline">← Back to home</Link>
//             </div>
//             {/* Render Quill-formatted HTML safely */}
//             <div className="mt-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description || "") }} />
//         </div>
//     );
// };

"use client";
import { useGetpostById } from "@/hooks/Apis/useGetpostById";
import { useAuth } from "@/hooks/useAuth";
import DOMPurify from "dompurify";
import { LucideLoader2, ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const GetPostById = ({ id }: { id: string }) => {
    const { post, loading } = useGetpostById(id);

    const { userId } = useAuth();
    console.log("USERID LIKES", userId)
    const [likes, setLikes] = useState(false);
    const [comments, setComments] = useState<{ _id: string; content: string }[]>([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {

        fetchPostComments();

    }, [])

    useEffect(() => {
        if (userId && id) {
            fetchPostLikes();
        }
    }, [userId, id])

    // Fetch comments
    const fetchPostComments = async () => {
        try {
            const commentRes = await fetch(`/api/create-story/${id}/comments`);
            const commentData = await commentRes.json();
            console.log("Commented Data", commentData)
            if (commentData.success) setComments(commentData.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // Fetch Likes

    const fetchPostLikes = async () => {


        try {
            const Likes = await fetch(`/api/likes?user=${userId}&post=${id}`);
            const likesRes = await Likes.json();
            console.log("Likes Response!!", likesRes.liked)

            setLikes(likesRes.liked)

        } catch (error) {
            console.log("Error fetching data", error)
        }
    }



    // Handle Like
    const handlePostLike = async () => {
        try {
            const response = await fetch(`/api/likes`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ post: id, user: userId }),
            });

            const data = await response.json();
            console.log("RESPONSE BODYLIKES:", data.liked);
            setLikes(data.liked)



        } catch (error) {
            console.error("Error liking post", error);
        }
    };


    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;
        try {
            const res = await fetch(`/api/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: commentText, post: id, user: userId }),
            });
            const data = await res.json();
            // console.log("COMMENTS DATA", data.data)
            // setComments(data?.data)

        } catch (error) {
            console.error("Error adding comment", error);
        }
    };

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

            {/* Like & Comment Section */}
            <div className="mt-8 flex items-center space-x-6">
                <button onClick={handlePostLike} className="flex items-center space-x-2 text-gray-600 hover:text-pink-500">
                    <ThumbsUp className={`w-5 h-5 ${likes ? "fill-pink-500 text-pink-500" : "text-pink-500"}`} />

                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                    <MessageCircle className="w-5 h-5" /> <span>{comments.length} Comments</span>
                </button>
            </div>

            {/* Comment Input */}
            <div className="mt-6">
                <textarea
                    className="w-full p-3 border rounded-lg"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                    onClick={handleCommentSubmit}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Post Comment
                </button>
            </div>

            {/* Comment List */}
            <div className="mt-6 space-y-4">
                {comments.map((comment) => (
                    <div key={comment._id} className="border p-3 rounded-lg">
                        <p className="text-gray-800">{comment.content}</p>
                        <button className="text-blue-500 mt-2 text-sm">Reply</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
