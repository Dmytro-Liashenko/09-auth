import { cookies } from "next/headers";
import axios from "axios";
import type { User } from "@/types/user";
import type { Note, NoteTag } from "@/types/note";

const API_URL = "https://notehub-api.goit.study";

async function getServerApi() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    return axios.create({
        baseURL: API_URL,
        headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken.value}` }),
        },
    });
}

export async function checkSession(): Promise<User | null> {
    try {
    const api = await getServerApi();
    const response = await api.get<User>("/auth/session");
    return response.data;
    } catch {
    return null;
    }
}

export async function getMe(): Promise<User | null> {
    try {
    const api = await getServerApi();
    const response = await api.get<User>("/users/me");
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
    const api = await getServerApi();
    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note | null> {
    try {
        const api = await getServerApi();
        const response = await api.get<Note>(`/notes/${id}`);
        return response.data;
    } catch {
        return null;
    }
}