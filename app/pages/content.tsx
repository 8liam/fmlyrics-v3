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
    <main className="xl:px-[25vw] lg:px-[15vw] md:px-[5vw] px-[2vw] min-h-screen">
      <MusicInfo />
    </main>
  );
}
type PageData = {
  artist?: any;
  songTitle?: any;
  error?: any;
  message?: any;
  albumArt?: any;
  albumName?: any;
};
function MusicInfo() {
  const { data: session } = useSession();
  const { artist, songTitle, error, message, albumArt, albumName }: PageData =
    useMusic() || {};
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
    return (
      <div className="mt-4 space-y-12 mb-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-semibold">
            Start Playing Music to Get Started.
          </h1>
        </div>
      </div>
    );
  }
  if (!session) {
    return (
      <>
        <div className="mt-12 space-y-12 mb-8 text-center">
          <div className="space-y-4">
            <h1 className="text-6xl font-semibold">FMLyrics</h1>
            <p className="text-center justify-center">
              A tool to find the lyrics of the currently playing song through
              spotify using Genius or other lyric search platforms.
            </p>
          </div>
          <div className="flex items-center justify-center ">
            <button
              onClick={() => signIn("spotify", { callbackUrl: "/" })}
              className="bg-white text-black font-semibold py-2 px-4 rounded-md flex items-center hover:invert border-black border  duration-300 ease-linear "
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                clipRule="evenodd"
                className="mr-2"
              >
                <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
              </svg>
              <span>Login With Spotify</span>
            </button>
          </div>
        </div>
      </>
    );
  } else if (session) {
    return (
      <div className="mt-4 space-y-12 mb-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-semibold">
            Start Playing Music to Get Started.
          </h1>
        </div>
      </div>
    );
  }
}
