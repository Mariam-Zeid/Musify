import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { auth } from "@/auth";
import Sidebar from "@/components/shared/sidebar/sidebar";
import Navbar from "@/components/shared/navbar/navbar";
import Loading from "@/components/shared/loading/loading";
import MusicPlayer from "@/components/shared/music player/musicPlayer";
import ReactQueryProvider from "@/providers/reactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musify",
  description: "Enjoy your music with Musify",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <Toaster />
            <Sidebar>
              <Suspense fallback={<Loading />}>
                <div className="bg-neutral-900 bg-gradient-to-b from-emerald-800 to-35% text-neutral-400 rounded-lg w-full h-full overflow-hidden overflow-y-auto scrollbar">
                  <Navbar />
                  <div className="px-6 h-full">{children}</div>
                </div>
              </Suspense>
            </Sidebar>
            <MusicPlayer />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
