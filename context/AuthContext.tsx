"use client"

import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react"

export interface AuthContext {
    user: User | null;
    loading: boolean;
    userId: string | null;
    logout: () => Promise<void>;
    getUserId: () => Promise<string | null>;

}

export const AuthContext = createContext<AuthContext>({
    user: null,
    loading: true,
    userId: null,
    logout: async () => Promise.resolve(),
    getUserId: async () => Promise.resolve(null),
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);


    console.log("USERId", userId)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        getUserId();


        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        router.push("/")
    };

    const getUserId = async () => {
        const response = await fetch('/api/user', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setUserId(data?.data[0]?._id);
        return data;
    }

    return (
        <AuthContext.Provider value={{ user, userId, loading, logout, getUserId }}>
            {children}
        </AuthContext.Provider>
    )
}