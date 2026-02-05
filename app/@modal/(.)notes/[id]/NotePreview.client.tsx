"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import {fetchNoteById} from "@lib/api"
import Modal from "@/components/Modal/Modal"
import css from "./NotePreview.module.css"


interface NotesPreviewModalProps{
    id: string
}

export default function NotePreviewModal ({id}: NotesPreviewModalProps){
const router = useRouter()
const {data: note, isLoading, error} = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false
})

const handleClose = () => {
    router.back()
}

if(isLoading){
    return (
        <Modal onClose={handleClose}>
        <p>
        Loading, please wait...
        </p>
        </Modal>
    )
}

if(error || !note){
    return(
        <Modal onClose={handleClose}>
            <p>
                Something went wrong
            </p>
        </Modal>
    )
}

return(
        <Modal onClose={handleClose}>
        <div className={css.container}>
            <div className={css.header}>
                <button
                className={css.backBtn}
                onClick={handleClose}
                aria-label="Close modal"
            >
                Close
            </button>
            <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <p className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
            </p>
            </div>
        </div>
    </Modal>
)

}
