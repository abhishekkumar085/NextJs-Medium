"use client";
import { useEffect, useState } from "react";

export function useGetpostById(id: string) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        postById();
    }, [id]);

    async function postById() {
        try {
            setLoading(true);
            const response = await fetch(`/api/create-story/${id}`, { method: "GET" });

            if (!response.ok) {
                throw new Error(`Failed to fetch post: ${response.statusText}`);
            }

            const data = await response.json();
            setPost(data?.data || null);
        } catch (error) {
            console.error("Error while getting post by id:", error);
        } finally {
            setLoading(false);
        }
    }

    return { post, loading };
}
