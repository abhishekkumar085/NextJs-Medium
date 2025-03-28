import { useEffect, useState } from "react";

export function useGetpostById(id: string) {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        postById();

    }, [])


    async function postById() {

        try {
            setLoading(true);
            const response = await fetch(`/api/create-story/${id}`, {
                method: "GET"
            })
            const data = await response.json();
            setPost(data?.data);
            console.log("GETPOSTBYID", data)


        } catch (error) {
            console.log("Error while getting post by id", error)
            setLoading(false)
        } finally {
            setLoading(false);
        }
    }

    return { post, loading }



}