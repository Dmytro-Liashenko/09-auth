import Link from "next/link";
import type { NoteTag } from "@/types/note";
import css from "./SidebarNotes.module.css";





export default async function SidebarNotes() {
    
    const TAGS: NoteTag[] = ["Todo", "Meeting", "Personal", "Shopping", "Work"];

    return (
        <ul className={css.menuList}>
        <li className={css.menuItem}>
            <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
            </Link>
        </li>
        {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
            </Link>
            </li>
        ))}
        </ul>
    );
}