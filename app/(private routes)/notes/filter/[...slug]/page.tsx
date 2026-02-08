import type { Metadata } from "next";
import { dehydrate ,HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {fetchNotes} from "@/lib/api/serverApi"

import { NoteTag } from "@/types/note";
import FilteredNotesClient from "./Notes.client";

type PageProps = {
    params: Promise<{ slug: string[] }>;
};


export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const tag = params.slug[0];
    const displayTag = tag === "all" ? "All Notes" : tag;

    return {
        title: `${displayTag} | NoteHub`,
        description: `Browse your ${displayTag.toLowerCase()} notes in NoteHub.`,
        openGraph: {
        title: `${displayTag} | NoteHub`,
        description: `Browse your ${displayTag.toLowerCase()} notes in NoteHub.`,
        url: `https://your-app.vercel.app/notes/filter/${tag}`,
        images: [
            {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            },
        ],
        },
    };
}

export default async function FilteredNotesPage( props : PageProps) {
    const queryClient = new QueryClient()
    const params = await props.params;

    const tag = params.slug[0] === "all" ? undefined : (params.slug[0] as NoteTag)
    
    await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
        fetchNotes({
        page: 1,
        perPage: 10,
        tag,
        }),
    });


    return  (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FilteredNotesClient tag={tag}/>
        </HydrationBoundary>
    )
}