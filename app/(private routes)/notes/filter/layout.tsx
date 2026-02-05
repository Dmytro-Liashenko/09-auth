
import css from "./layoutNotesFilter.module.css";

export default function FilterLayout({
    sidebar,
    children,
    modal,
    }: {
    sidebar: React.ReactNode;
    children: React.ReactNode;
    modal?: React.ReactNode
    }) {
    return (
        <section className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <div className={css.notesWrapper}>{children}</div>
        {modal}
        </section>
    );
}