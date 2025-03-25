"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { auth, googleProvider } from "@/firebase/firebaseConfig";
import { useDialog } from "@/hooks/useDialog";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

const DialogAPP = () => {

    const { openDialog, setOpenDialog } = useDialog();

    const handleGoogleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);
            const user = response.user;
            const token = await user.getIdToken();
            console.log("TOKEN", token)
            // console.log("User Info:", user);

            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Login Failed: ${errorText}`);
            }

            const userData = await res.json();
            console.log("User Data:", userData);

        } catch (error) {
            console.log("LoginFailed", error);
        }
    }

    return (
        <div >
            <Dialog open={openDialog} onOpenChange={setOpenDialog}  >

                <DialogContent className="w-[70%] h-[80%]">

                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl mt-20">Join Medium.</DialogTitle>

                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-2.5 mt-20">
                        <div className="px-8 py-2 space-x-8 border border-black  rounded-full cursor-pointer flex">
                            <Image src="/google-icon-logo.svg" width={20} height={20} alt="google" />
                            <button className="cursor-pointer" onClick={handleGoogleLogin}>
                                Sign in with google
                            </button>
                        </div>
                        <div className="px-8 py-2 border border-black  rounded-full cursor-pointer flex space-x-5">
                            <Image src="/fb.webp" width={20} height={20} alt="google" />
                            <button className="cursor-pointer">
                                Sign in with facebook
                            </button>
                        </div>



                    </div>
                    <div className="text-center mt-10">
                        Already have an account? <Link href="/signin" className="font-bold text-green-600 "> Sign in</Link>
                    </div>


                    <div className="text-center mt-10">
                        <p className="text-sm text-gray-500">Click “Sign up” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</p>
                    </div>
                </DialogContent>



            </Dialog>


        </div>
    )
};

export default DialogAPP;
