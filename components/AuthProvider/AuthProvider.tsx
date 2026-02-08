"use client";

import { useEffect, useState } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setUser, clearUser } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
    const verifySession = async () => {
        try {
            
            const session = await checkSession();
            
            
            if (session) {
            const user = await getMe();
            
            if (user) {
                setUser(user);
            } else {
                clearUser();
            }
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
    }, []);

    if (isChecking) {
        return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            Loading...
        </div>
        );
    }

    return <>{children}</>;
}