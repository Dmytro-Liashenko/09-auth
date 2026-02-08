import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"
import {fetchNoteById} from "@/lib/api/serverApi"
import NotePreviewModal from "./NotePreview.client"

type PageProps = {
    params: Promise<{id: string}>
}

export default async function NoteInterceptPage(props: PageProps){
    const params = await props.params
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", params.id],
        queryFn: () => fetchNoteById(params.id)
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewModal id={params.id}/>
        </HydrationBoundary>
    )
}

