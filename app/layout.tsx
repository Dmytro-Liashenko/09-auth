import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@components/Header/Header"
import Footer from "@components/Footer/Footer";
import TanStackProvider from "@components/TanStackProvider/TanStackProvider"
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "NoteHub - Your Personal Note Management",
  description: "NoteHub is a simple and efficient application designed for managing personal notes. Keep your thoughts organized and accessible.",
  openGraph: {
    title: "NoteHub - Your Personal Note Management",
    description: "NoteHub is a simple and efficient application designed for managing personal notes.",
    url: "https://your-app.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <TanStackProvider>
          <AuthProvider>
          <Header/>
          <main >
          {children}
          {modal}
          </main>
          <Footer/>
          <div id="modal-root"></div>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
} 
