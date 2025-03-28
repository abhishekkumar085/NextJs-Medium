"use client"

import { useEffect, useState } from "react";

export function useFetchPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetchPost();
    }, [])

    async function fetchPost() {
        setLoading(true)
        try {
            const response = await fetch("/api/create-story", {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })
            const data = await response.json();
            setPosts(data?.data);

        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return { posts, loading }



}