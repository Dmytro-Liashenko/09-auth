"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import css from "./EditProfilePage.module.css";

export default function EditProfileClient() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { setUser } = useAuthStore();

    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        refetchOnMount: false,
    });

    const [username, setUsername] = useState(user?.username || "");

    const updateMutation = useMutation({
        mutationFn: updateMe,
        onSuccess: (updatedUser) => {
        setUser(updatedUser);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/profile");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateMutation.mutate({ username });
    };

    const handleCancel = () => {
        router.push("/profile");
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>No user data</p>;
    }

    return (
        <main className={css.mainContent}>
        <div className={css.profileCard}>
            <h1 className={css.formTitle}>Edit Profile</h1>

            <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            />

            <form className={css.profileInfo} onSubmit={handleSubmit}>
            <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                id="username"
                type="text"
                value={username || user.username} 
                onChange={(e) => setUsername(e.target.value)}
                className={css.input}
                required
                />
            </div>

            <p>Email: {user.email}</p>

            <div className={css.actions}>
                <button
                type="submit"
                className={css.saveButton}
                disabled={updateMutation.isPending}
                >
                {updateMutation.isPending ? "Saving..." : "Save"}
                </button>
                <button
                type="button"
                className={css.cancelButton}
                onClick={handleCancel}
                >
                Cancel
                </button>
            </div>
            </form>
        </div>
        </main>
    );
}