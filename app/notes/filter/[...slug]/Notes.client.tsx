"use client";

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { NoteTag } from "@/types/note";
import css from "./Notes.module.css"
import Link from 'next/link';

interface FilteredNotesClientProps {
    tag?: NoteTag;
}

    export default function FilteredNotesClient({ tag }: FilteredNotesClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 1000);

    const { data, isError, isLoading } = useQuery({
        queryKey: ["notes", currentPage, debouncedSearch, tag],
        queryFn: () => fetchNotes({
        page: currentPage,
        perPage,
        search: debouncedSearch || undefined,
        tag,
        }),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
        retry: false,
    });

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    if (isLoading) return <p>Loading, please wait...</p>;
    if (isError || !data) return <p>Something went wrong.</p>;

    return (
        <div className={css.app}>
        <header className={css.toolbar}>
            <SearchBox value={search} onChange={handleSearchChange} />
            {data && (
            <Pagination
                currentPage={currentPage}
                totalPages={data.totalPages || 0}
                onPageChange={setCurrentPage}
            />
            )}
            <Link href="/notes/action/create" className={css.button}>
                Create note +
            </Link>
        </header>
        {data && <NoteList notes={data.notes} />}
        </div>
    );
}