"use client"
import { GetPostById } from "@/components/GetPostById";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
    const { id } = useParams();

    if (typeof id !== "string") {
        return <div>Error: Invalid ID</div>;
    }

    return (
        <GetPostById id={id} />
    )
};

export default page;
