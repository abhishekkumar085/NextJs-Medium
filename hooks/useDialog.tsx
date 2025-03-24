"use client"
import { dialogContext, dialogContextType } from "@/context/dialogContext";
import { useContext } from "react";

export const useDialog = (): dialogContextType => {
    const response = useContext(dialogContext);
    if (response === undefined) {
        throw new Error("useDialog must be used within a DialogProvider");
    }

    return response;
}