"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import Image from "next/image";
import css from "./Profile.client.module.css";

export default function ProfileClient() {
    const { user, setUser } = useAuthStore();

    const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    refetchOnMount: false,
    });

    useEffect(() => {
    if (data) {
        setUser(data);
    }
    }, [data, setUser]);

    if (isLoading) {
    return <p>Loading profile...</p>;
    }

    const displayUser = data || user;

    if (!displayUser) {
    return <p>No user data</p>;
    } 

    return (
    <main className={css.mainContent}>
        <div className={css.profileCard}>
        <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
            </Link>
        </div>
        <div className={css.avatarWrapper}>
            <Image
            src={displayUser.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            />
        </div>
        <div className={css.profileInfo}>
            <p>Username: {displayUser.username}</p>
            <p>Email: {displayUser.email}</p>
        </div>
        </div>
    </main>
    );
}