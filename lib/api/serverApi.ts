import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";
import type { Note, NoteTag } from "@/types/note";
import type { AxiosResponse } from "axios";

async function getCookieHeader(): Promise<string> {
    const cookieStore = await cookies();
    return cookieStore
    .getAll()
    .map((cookie: { name: string; value: string }) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export async function checkSession(): Promise<AxiosResponse<User | null>> {
    const cookieHeader = await getCookieHeader();
    
    return api.get<User | null>("/auth/session", {
    headers: {
        Cookie: cookieHeader,
    },
    });
}

export async function getMe(): Promise<User | null> {
    try {
    const cookieHeader = await getCookieHeader();
    
    const response = await api.get<User>("/users/me", {
        headers: {
        Cookie: cookieHeader,
        },
    });
    
    return response.data;
    } catch {
        return null;
    }
}

interface FetchNotesParams {
    page: number;
    perPage: number;
    search?: string;
    tag?: NoteTag;
}

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(
    params: FetchNotesParams
): Promise<FetchNotesResponse> {
    const cookieHeader = await getCookieHeader();
    const response = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
        Cookie: cookieHeader,
    },
    });
    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note | null> {
    try {
        const cookieHeader = await getCookieHeader();
        const response = await api.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieHeader,
        },
        });
        return response.data;
    } catch {
        return null;
    }
}