"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    
    const pathname = usePathname();
    const { setUser, clearUser, isAuthenticated } = useAuthStore();
    const [isChecking, setIsChecking] = useState(!isAuthenticated);

    useEffect(() => {
        if (isAuthenticated && !pathname.startsWith("/profile") && !pathname.startsWith("/notes")) {
        setIsChecking(false);
        return;
    }

    const verifySession = async () => {
        try {
            const user = await checkSession();
            if (user) {
            setUser(user);
            } else {
            clearUser();
            }
        } catch (error) {
            clearUser();
        } finally {
            setIsChecking(false);
        }
    };

    verifySession();
    }, [pathname, setUser, clearUser, isAuthenticated]); 

    if (isChecking && (pathname.startsWith("/profile") || pathname.startsWith("/notes"))) {
        return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            Loading...
        </div>
        );
    }

    return <>{children}</>;
}