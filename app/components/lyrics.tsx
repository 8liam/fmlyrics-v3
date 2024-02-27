import { useState, useEffect } from "react";

type LyricsProps = {
  artist: string;
  song: string;
};

export default function Lyrics({ artist, song }: LyricsProps) {
  const [lyrics, setLyrics] = useState<{ title: string; lyrics: string }>({
    title: "",
    lyrics: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchLyrics = async () => {
      try {
        /*
        const response = await fetch(
          `/api/lyrics?artist=${artist}&title=${song}`
        );
        */
        const response = await fetch(
          `https://lyrist.vercel.app/api/${song}/${artist}`
        );
        const data = await response.json();
        setLyrics(data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch lyrics:", error);
        setLyrics({
          title: "Error fetching lyrics",
          lyrics: "Error fetching lyrics",
        });
      }
    };

    fetchLyrics(); // Call the async function
  }, [artist, song]); // Dependency array to re-run useEffect when `artist` or `song` changes
  if (lyrics.title && !loading) {
    return (
      <div className="bg-background rounded p-4 mb-80">
        <div className="text-center">
          {lyrics.title && (
            <div className="whitespace-pre text-wrap">{lyrics.lyrics}</div>
          )}
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="bg-background rounded p-4 mb-80 animate-pulse">
        <div className="text-center animate-pulse ">
          <div className="whitespace-pre"></div>
        </div>
      </div>
    );
  }
}
