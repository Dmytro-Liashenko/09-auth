import type { Metadata } from "next";
import EditProfileClient from "./EditProfile.client";

export const metadata: Metadata = {
    title: "Edit Profile | NoteHub",
    description: "Edit your NoteHub profile information",
    openGraph: {
        title: "Edit Profile | NoteHub",
        description: "Edit your NoteHub profile information",
        url: "https://your-app.vercel.app/profile/edit",
        images: [
        {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
        ],
    },
};

export default function EditProfilePage() {
    return <EditProfileClient />;
}