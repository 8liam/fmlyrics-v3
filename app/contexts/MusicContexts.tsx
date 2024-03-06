"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useSession, getSession } from "next-auth/react";

const MusicContext = createContext<{
  artist: string;
  songTitle: string;
  error: string;
  message: string;
  albumArt: string;
  albumName: string;
} | null>(null);

export function useMusic() {
  return useContext(MusicContext);
}

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [artist, setArtist] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [albumArt, setAlbumArt] = useState("");
  const [albumName, setAlbumName] = useState("");

  async function fetchMusic() {
    if (status !== "authenticated" || !session?.accessToken) {
      console.log("Session not ready or authenticated.");
      return
    }

    try {
      const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.item && data.is_playing) {
          setArtist(data.item.artists[0].name);
          setSongTitle(data.item.name);
          setAlbumArt(data.item.album.images[0].url);
          setAlbumName(data.item.album.name);
        } else {
          setMessage("No Music Is Playing");
        }
      } else {
        setMessage("No Music Is Playing");
      }
    } catch (error) {
      setError("An error occurred while fetching music data.");
      console.error(error);
    }
  }

  useEffect(() => {
    const checkSessionAndFetchMusic = async () => {
      const currentSession = await getSession();
      if (currentSession) {
        fetchMusic();
      }
    };

    checkSessionAndFetchMusic();

    const handleFocus = () => {
      fetchMusic();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [status, session]); // Removed 'loading' from dependencies

  return (
    <MusicContext.Provider value={{ artist, songTitle, error, message, albumArt, albumName }}>
      {children}
    </MusicContext.Provider>
  );
};
