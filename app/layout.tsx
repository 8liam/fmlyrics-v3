import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { MusicProvider } from "./contexts/MusicContexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FMLyrics",
  description:
    "A tool to find the lyrics of the currently playing song through spotify using Genius or other lyric search platforms.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <MusicProvider>
        <html lang="en" className="bg-background">
          <body className={inter.className}>
            {children}
          </body>
        </html>
      </MusicProvider>
    </SessionProvider >
  );
}
