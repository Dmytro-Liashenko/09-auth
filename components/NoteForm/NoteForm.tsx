"use client";

import { useState } from "react";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

interface NoteDraft {
    title: string;
    content: string;
    tag: NoteTag;
}

interface NoteFormProps {
    initialValues: NoteDraft;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    onChange: (field: string, value: string) => void;
}

interface FormErrors {
    title?: string;
    content?: string;
}

export default function NoteForm({
    initialValues,
    onSubmit,
    onCancel,
    onChange,
}: NoteFormProps) {
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validate = (name: string, value: string): string | undefined => {
    if (name === "title") {
        if (!value) return "Required";
        if (value.length < 3) return "Title must be at least 3 characters";
        if (value.length > 50) return "Title cannot exceed 50 characters";
    }
    if (name === "content") {
        if (value.length > 500) return "Content cannot exceed 500 characters";
    }
    return undefined;
    };

    const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleChange = (name: string, value: string) => {
    onChange(name, value);
    
    const error = validate(name, value);
    setErrors((prev) => ({
        ...prev,
        [name]: error,
    }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const titleError = validate("title", initialValues.title);
    const contentError = validate("content", initialValues.content);
    
    if (titleError || contentError) {
        setErrors({ title: titleError, content: contentError });
        setTouched({ title: true, content: true });
        return;
    }
    
    onSubmit(e);
    };

    return (
    <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
            id="title"
            type="text"
            name="title"
            defaultValue={initialValues.title}
            onChange={(e) => handleChange("title", e.target.value)}
            onBlur={() => handleBlur("title")}
            className={css.input}
        />
        {touched.title && errors.title && (
            <span className={css.error}>{errors.title}</span>
        )}
        </div>

        <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
            id="content"
            name="content"
            rows={8}
            defaultValue={initialValues.content}
            onChange={(e) => handleChange("content", e.target.value)}
            onBlur={() => handleBlur("content")}
            className={css.textarea}
        />
        {touched.content && errors.content && (
        <span className={css.error}>{errors.content}</span>
        )}
        </div>

        <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
            id="tag"
            name="tag"
            defaultValue={initialValues.tag}
            onChange={(e) => onChange("tag", e.target.value)}
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
        <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
        </button>
        <button type="submit" className={css.submitButton}>
            Create note
        </button>
        </div>
    </form>
    );
}