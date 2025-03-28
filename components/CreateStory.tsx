"use client";
import { useState } from "react";
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const CreateStory = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false)

    const { userId } = useAuth();
    const handleSubmit = async () => {
        const plainTextContent = content.replace(/<[^>]*>/g, "").trim();
        if (!plainTextContent) {
            toast.error("Error", { description: "Description is required!" });
            return;
        }
        setLoading(true)
        try {
            const response = await fetch("/api/create-story", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description: content, userId })
            });
            if (response.ok) {
                toast.success("Success", {
                    description: "Post created successfully!!",
                })
                setTitle('');
                setContent('')
            } else {
                toast.error("Error", {
                    description: response.statusText,
                })
                setLoading(false);
                setTitle('');
                setContent('')
            }
        } catch (error) {
            console.log("Error while creating post: ", error)
            toast.error("Error", {
                description: String(error),
            })
            setTitle('');
            setContent('')

            setLoading(false)
        } finally {
            setLoading(false);
        }



    };

    return (
        <div className="container mx-auto w-full lg:max-w-5xl  p-6">
            <div className="flex flex-col space-y-6">
                {/* Title Input */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>


                    <div className="w-full">
                        <label htmlFor="title" className="text-3xl">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            minLength={3}
                            placeholder="Add Title..."
                            className="px-6 py-4 w-full border border-black rounded mt-2 font-semibold"
                        />
                    </div>

                    {/* Quill Editor (Client-side only) */}
                    <div className="w-full">
                        <label className="text-3xl">Description</label>
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            className="mt-2 bg-white"
                            theme="snow"

                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`cursor-pointer py-2.5 text-lg  bg-black rounded text-white hover:bg-gray-900 w-full mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Saving..." : " Save Story"}

                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStory;
