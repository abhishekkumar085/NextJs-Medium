"use client"
import { createContext, ReactNode, useState } from "react";

export interface dialogContextType {
    openDialog: boolean;
    setOpenDialog: (openDialog: boolean) => void;
}

export const dialogContext = createContext<dialogContextType | undefined>(undefined);

export const DailogProvider = ({ children }: { children: ReactNode }) => {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <dialogContext.Provider value={{ openDialog, setOpenDialog }}>
            {children}
        </dialogContext.Provider>
    )
}