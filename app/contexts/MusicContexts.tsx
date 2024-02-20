"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar"; // Ensure Navbar is used if needed, else this import is unnecessary
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
  const { data: session } = useSession();
  const [artist, setArtist] = useState("");
  const [error, setError] = useState(""); // Ensure error state is used if needed
  const [message, setMessage] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [albumArt, setAlbumArt] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [loading, setLoading] = useState(true);
  type session = {
    accessToken: string;
  };

  useEffect(() => {
    // Function to fetch music data
    async function fetchMusic() {
      try {
        if (session && session.accessToken) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
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
        }
        setLoading(false); // Set loading to false after fetching
      } catch {
        setLoading(false);
      }
    }

    // Delay the execution of fetchMusic
    const timer = setTimeout(() => {
      fetchMusic();
    }, 250); // Wait for 1.5 seconds

    return () => clearTimeout(timer); // Cleanup timeout
  }, [session]); // Dependency array includes session to re-run effect when session changes

  return (
    <MusicContext.Provider
      value={{ artist, songTitle, error, message, albumArt, albumName }}
    >
      {children}
    </MusicContext.Provider>
  );
};
