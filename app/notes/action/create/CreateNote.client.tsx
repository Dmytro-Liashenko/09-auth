"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";

export default function CreateNoteClient() {
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
    const formData = new FormData(e.currentTarget);
    
    const note = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        tag: formData.get("tag") as NoteTag,
    };

    createMutation.mutate(note);
    };

    const handleCancel = () => {
    router.back();
    };

    const handleChange = (field: string, value: string) => {
    setDraft({ [field]: value });
    };

    return (
    <NoteForm
        initialValues={draft}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onChange={handleChange}
    />
    );
}