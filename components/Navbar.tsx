"use client"
import { useDialog } from "@/hooks/useDialog";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    const { setOpenDialog } = useDialog();
    return (
        <div className=" border-b border-black ">
            <div className="container mx-auto max-w-screen-lg flex justify-between h-[4.5rem] w-full ">
                <div className="flex items-center  text-3xl font-semibold">
                    <Link href="/"> Medium</Link></div>
                <div className="flex items-center space-x-4">
                    <Link href="/our-story" className="">Our Story</Link>
                    <Link href="/membership" className="">Membership</Link>
                    <Link href="/write" className="">Write</Link>
                    <button className="cursor-pointer" onClick={() => setOpenDialog(true)}>Signin</button>
                    <button className="border rounded-full px-4 py-1.5 bg-black text-white cursor-pointer" onClick={() => setOpenDialog(true)}>Get started</button>
                </div>
            </div>
        </div>


    )

};

export default Navbar;
