"use client"
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useDialog } from "@/hooks/useDialog";
import { Bell, BellRing, LogOut, Search, SquarePen, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const DashboardNav = () => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const { setOpenDialog } = useDialog();


    const redirectNotificationPage = () => {
        if (!user) {
            setOpenDialog(true)
        } else {
            router.push('/notification')
        }
    }

    const redirectNewStoryPage = () => {
        if (!user) {
            setOpenDialog(true)
        } else {

            router.push('/new-story')
        }
    }


    console.log("DashboardUSer", user);
    console.log("DashboardUSer", user?.photoURL);
    return (
        <div className="flex  flex-row items-center px-8 justify-between h-14 border-b border-gray-200">
            <div className="flex  flex-row space-x-4">

                <div>
                    <h1 className="text-3xl font-bold ">Medium</h1>
                </div>
                <div className="relative flex items-center gap-2 bg-[#f9f9f9] rounded-full px-4 py-2">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-700"
                    />
                </div>
            </div>

            <div className="flex  flex-row space-x-8">
                <div onClick={redirectNewStoryPage} className="flex items-center space-x-2 cursor-pointer">
                    <SquarePen className="w-5 h-5 text-gray-500" />
                    <span>Write</span>
                </div>
                {!user && <div className="flex items-center space-x-2 cursor-pointer">
                    <button onClick={() => setOpenDialog(true)} className="rounded-full bg-[#1A8917] px-2 py-1 text-white">Sign up</button>
                </div>}

                {!user && <div className="flex items-center space-x-2 cursor-pointer">
                    <button onClick={() => setOpenDialog(true)}>Sign in</button>
                </div>}
                <div className="flex items-center space-x-2 cursor-pointer">
                    <Bell onClick={redirectNotificationPage} className="w-5 h-5 text-gray-500" />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full p-1 cursor-pointer focus:outline-none" asChild>
                        <Image
                            src={user?.photoURL || "https://miro.medium.com/v2/resize:fill:64:64/1*dmbNkD5D-u45r44go_cf0g.png"}
                            alt="Profile"
                            width={37}
                            height={37}
                            className="rounded-full"
                        />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40 ">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => console.log("Go to Profile")} className="cursor-pointer">
                            <User />
                            Profile

                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
                            <LogOut />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    )
};

export default DashboardNav;
