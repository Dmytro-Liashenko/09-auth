import { cookies } from "next/headers";
import axios from "axios";
import type { User } from "@/types/user";
import type { Note, NoteTag } from "@/types/note";
import type { AxiosResponse } from "axios";

const API_URL = "https://notehub-api.goit.study";


async function getCookieHeader(): Promise<string> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
    
    
    return cookieHeader;
}


const serverApi = axios.create({
    baseURL: API_URL,
});


export async function checkSession(): Promise<AxiosResponse<User | null>> {
    const cookieHeader = await getCookieHeader();
    
    return serverApi.get<User | null>("/auth/session", {
    headers: {
        Cookie: cookieHeader,
    },
    });
}

export async function getMe(): Promise<User | null> {
    try {
        const cookieHeader = await getCookieHeader();
        
        const response = await serverApi.get<User>("/users/me", {
        headers: {
            Cookie: cookieHeader,
        },
    });
    
    
    return response.data;
    } catch (error) {
    
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
    const response = await serverApi.get<FetchNotesResponse>("/notes", {
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
    const response = await serverApi.get<Note>(`/notes/${id}`, {
        headers: {
        Cookie: cookieHeader,
        },
    });
    return response.data;
    } catch {
        return null;
    }
}