"use client"
import React, { createContext, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar"; // Ensure Navbar is used if needed, else this import is unnecessary
const MusicContext = createContext();

export function useMusic() {
  return useContext(MusicContext);
}

export const MusicProvider = ({ children }) => {
  const { data: session } = useSession();
  const [artist, setArtist] = useState("");
  const [error, setError] = useState(""); // Ensure error state is used if needed
  const [message, setMessage] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [albumArt, setAlbumArt] = useState("");
  const [albumName, setAlbumName] = useState("");

  useEffect(() => {
    async function fetchMusic() {
      if (session?.user.name) {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        if (response.ok) {
          try {
            const data = await response.json();
            if (data.item && data.is_playing === true) {
              setArtist(data.item.artists[0].name);
              setSongTitle(data.item.name);
              setAlbumArt(data.item.album.images[0].url);
              setAlbumName(data.item.album.name);
            } else {
              setMessage("No Music Is Playing");
            }
          } catch (error) {
            console.error(error); // Log error for debugging
            setMessage("Failed to fetch music data");
          }
        } else {
          setMessage("No Music Is Playing");
        }
      }
    }

    if (session) {
      fetchMusic();
    }
  }, [session]); // Dependency array includes session to re-run effect when session changes

  return (
    <MusicContext.Provider
      value={{ artist, songTitle, error, message, albumArt, albumName }}
    >
      {children}
    </MusicContext.Provider>
  );
};