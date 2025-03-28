"use client";
import { useState } from "react";
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const CreateStory = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { userId } = useAuth();
    console.log("Create STORY", userId)
    const handleSubmit = async () => {
        // const response = await fetch("/api/stories", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ title, content })
        // });

        // if (response.ok) {
        //     alert("Story saved successfully!");
        // } else {
        //     alert("Failed to save story.");
        // }






        console.log("TITLE", title)
        console.log("DESC", content)
    };

    return (
        <div className="container mx-auto w-full lg:max-w-5xl  p-6">
            <div className="flex flex-col space-y-6">
                {/* Title Input */}
                <div className="w-full">
                    <label htmlFor="title" className="text-3xl">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    onClick={handleSubmit}
                    className="cursor-pointer py-2.5 text-lg  bg-black rounded text-white hover:bg-gray-900"
                >
                    Save Story
                </button>
            </div>
        </div>
    );
};

export default CreateStory;
