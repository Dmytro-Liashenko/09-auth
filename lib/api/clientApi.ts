import { api } from "./api";
import type { User } from "@/types/user";
import type { Note, NoteTag } from "@/types/note";

interface RegisterData {
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export async function register(data: RegisterData): Promise<User> {
    const response = await api.post<User>("/auth/register", data);
    return response.data;
}

export async function login(data: LoginData): Promise<User> {
    const response = await api.post<User>("/auth/login", data);
    return response.data;
}

export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
    try {
        const response = await api.get<User>("/auth/session");
        return response.data;
    } catch {
        return null;
    }
}


export async function getMe(): Promise<User> {
    const response = await api.get<User>("/users/me");
    return response.data;
}

interface UpdateUserData {
    username?: string;
}

export async function updateMe(data: UpdateUserData): Promise<User> {
    const response = await api.patch<User>("/users/me", data);
    return response.data;
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
    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
}

interface CreateNoteData {
    title: string;
    content: string;
    tag: NoteTag;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
    const response = await api.post<Note>("/notes", data);
    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
}