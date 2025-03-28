"use client";

import { useEffect, useState } from "react";

export function useFetchPost(page: number = 1, limit: number = 10) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchPost() {
            setLoading(true);
            try {
                const response = await fetch(`/api/create-story?page=${page}&limit=${limit}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setPosts(data?.data);
                setTotalPages(data?.totalPages);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [page, limit]);

    return { posts, loading, totalPages };
}
