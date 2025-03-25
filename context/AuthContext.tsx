"use client"

import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react"

export interface AuthContext {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;

}

export const AuthContext = createContext<AuthContext>({
    user: null,
    loading: true,
    logout: async () => Promise.resolve(),
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}