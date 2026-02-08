"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteStore();

    const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
        clearDraft();
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        router.back();
    },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate({
        title: draft.title,
        content: draft.content,
        tag: draft.tag,
        });
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
            id="title"
            type="text"
            name="title"
            value={draft.title}
            onChange={(e) => setDraft({ title: e.target.value })}
            className={css.input}
            required
        />
        </div>

        <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
            id="content"
            name="content"
            rows={8}
            value={draft.content}
            onChange={(e) => setDraft({ content: e.target.value })}
            className={css.textarea}
            required
        />
        </div>

        <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
            id="tag"
            name="tag"
            value={draft.tag}
            onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
            className={css.select}
        >
            {TAGS.map((tag) => (
            <option key={tag} value={tag}>
                {tag}
            </option>
            ))}
        </select>
        </div>

        <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
        </button>
        <button
            type="submit"
            className={css.submitButton}
            disabled={createMutation.isPending}
            >
            {createMutation.isPending ? "Creating..." : "Create note"}
            </button>
        </div>
        </form>
    );
}