import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className=" border-b-2 border-black ">
            <div className="container mx-auto max-w-screen-lg flex justify-between h-20 w-full ">
                <div className="flex items-center  text-3xl font-semibold">
                    <Link href="/"> Medium</Link></div>
                <div className="flex items-center space-x-4">
                    <Link href="/our-story" className="">Our Story</Link>
                    <Link href="/membership" className="">Membership</Link>
                    <Link href="/write" className="">Write</Link>
                    <Link href="/signin" className="">Signin</Link>
                    <Link href="/signup" className="border rounded-full px-4 py-1.5 bg-black text-white">Get started</Link>
                </div>
            </div>
        </div>


    )

};

export default Navbar;
