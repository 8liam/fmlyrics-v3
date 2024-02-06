"use client";
import { useState } from "react";
import { useMusic } from "../contexts/MusicContexts";
import { signIn, useSession } from "next-auth/react";
import Lyrics from "../components/lyrics";
import Image from "next/image";
import MusicPlayer from "../components/musicplayer";
import MusicPlayerSkeleton from "../components/musicplayerskeleton";

export default function Content() {
  return (
    <main className="px-[25vw]">
      <MusicInfo />
    </main>
  );
}

function MusicInfo() {
  const { data: session } = useSession();
  const { artist, songTitle, error, message, albumArt, albumName } = useMusic();
  if (artist || songTitle) {
    return (
      <div className="mt-4 space-y-4 mb-8">
        <MusicPlayer
          song={songTitle}
          artist={artist}
          albumArt={albumArt}
          albumName={albumName}
        />
        <Lyrics song={songTitle} artist={artist} />
      </div>
    );
  }
  if (error) {
    return <p className="text-3xl my-8">{error}</p>;
  }
  if (message) {
    return <p className="text-3xl my-8">{message}</p>;
  }
  if (!session) {
    return <p>You not signed in Jittums</p>;
  } else {
    return (
      <div className="mt-4 space-y-4 mb-8">
        <p>Start Listening</p>
      </div>
    );
  }
}
