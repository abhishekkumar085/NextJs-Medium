// "use client"
// import { useFetchPost } from "@/hooks/Apis/useFetchPost";
// import { LucideLoader2 } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// const Post = () => {
//     const { posts, loading } = useFetchPost();

//     if (loading) return (
//         <div className="flex h-screen items-center justify-center">
//             <LucideLoader2 className="animate-spin ml-2 text-center" />
//         </div>
//     );

//     return (
//         <div className="max-w-4xl mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
//             <div className="space-y-6">
//                 {posts.map((post: { _id: string; title: string; description: string }) => (
//                     <div key={post._id} className="border-b pb-4">
//                         <h2 className="text-xl font-semibold">
//                             <Link href={`/dashboard/${post._id}`} className="hover:underline">
//                                 {post.title}
//                             </Link>
//                         </h2>

//                         <p className="text-gray-600">
//                             {post.description.replace(/<[^>]*>/g, "").substring(0, 100)}...
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// };

// export default Post;


"use client";

import { useFetchPost } from "@/hooks/Apis/useFetchPost";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"; // Ensure correct path

const Post = () => {
    const [page, setPage] = useState(1);
    const { posts, loading, totalPages } = useFetchPost(page, 7);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <LucideLoader2 className="animate-spin ml-2 text-center" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-4">
            <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
            <div className="space-y-2.5">
                {posts.map((post: { _id: string; title: string; description: string }) => (
                    <div key={post._id} className="border-b pb-2">
                        <h2 className="text-xl font-semibold">
                            <Link href={`/dashboard/${post._id}`} className="hover:underline">
                                {post.title}
                            </Link>
                        </h2>
                        <p className="text-gray-600">
                            {post.description.replace(/<[^>]*>/g, "").substring(0, 100)}...
                        </p>
                    </div>
                ))}
            </div>

            <Pagination className="mt-6 flex justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                        <PaginationItem key={pageNum}>
                            <PaginationLink
                                href="#"
                                isActive={pageNum === page}
                                onClick={() => setPage(pageNum)}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {totalPages > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default Post;
