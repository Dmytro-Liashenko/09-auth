import type { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub to keep your thoughts organized.",
    openGraph: {
        title: "Create Note | NoteHub",
        description: "Create a new note in NoteHub.",
        url: "https://your-app.vercel.app/notes/action/create",
        images: [
        {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
        ],
    },
};

export default function CreateNotePage() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <CreateNoteClient />
            </div>
        </main>
    );
}