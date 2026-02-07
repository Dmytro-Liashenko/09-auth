"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
    children,
    }: {
    children: React.ReactNode;
    }) {
    const pathname = usePathname();
    const router = useRouter();
    const { setUser, clearUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
        try {
            const user = await checkSession();
            if (user) {
            setUser(user);
            } else {
            clearUser();
            
            if (
                pathname.startsWith("/profile") ||
                pathname.startsWith("/notes")
            ) {
                router.push("/sign-in");
            }
            }
        } catch (error) {
            clearUser();
            if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
            router.push("/sign-in");
            }
        } finally {
            setIsLoading(false);
        }
        };

        verifySession();
    }, [pathname, setUser, clearUser, router]);

    if (isLoading) {
        return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            Loading...
        </div>
        );
    }

    return <>{children}</>;
}