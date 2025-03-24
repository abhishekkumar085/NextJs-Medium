"use client"
import DialogAPP from '@/components/Dialog';
import { auth, googleProvider } from '@/firebase/firebaseConfig';
import { useDialog } from '@/hooks/useDialog';
import { signInWithPopup } from 'firebase/auth';
import React from 'react'

const page = () => {

    const { openDialog, setOpenDialog } = useDialog();

    console.log("Open Dialog:", openDialog);


    const handleGoogleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);
            const user = response.user;
            console.log("User Info:", user);

        } catch (error) {
            console.log("LoginFailed", error);
        }


    }


    return (
        <></>
    )
}

export default page
