import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

type PageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;

    try {
    const note = await fetchNoteById(params.id);

    if (!note) {
        return {
        title: "Note Not Found | NoteHub",
        description: "The requested note could not be found.",
        };
    }

    return {
        title: `${note.title} | NoteHub`,
        description: note.content.substring(0, 160),
        openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content.substring(0, 160),
        url: `https://your-app.vercel.app/notes/${params.id}`,
        images: [
            {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            },
        ],
        },
    };
    } catch (error) {
    return {
        title: "Note Not Found | NoteHub",
        description: "The requested note could not be found.",
    };
    }
}

export default async function NotePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
    });

    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
    </HydrationBoundary>
    );
}