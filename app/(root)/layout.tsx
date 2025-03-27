import DashboardNav from "@/components/DashboardNav";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <DashboardNav />
            {children}
        </div>
    )
};

export default RootLayout;
