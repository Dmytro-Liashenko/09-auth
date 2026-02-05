import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ProfileClient from "./Profile.client";
import css from "./page.module.css";

export const metadata: Metadata = {
    title: "Profile | NoteHub",
    description: "View and manage your NoteHub profile",
    openGraph: {
    title: "Profile | NoteHub",
    description: "View and manage your NoteHub profile",
    url: "https://your-app.vercel.app/profile",
    images: [
        {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
    ],
    },
};

export default function ProfilePage() {
    return <ProfileClient />;
}