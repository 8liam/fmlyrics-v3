import { useState, useEffect } from "react";

// Assuming `props` has `artist` and `song` properties
export default function Lyrics({ artist, song }) {
  const [lyrics, setLyrics] = useState({ title: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchLyrics = async () => {
      try {
        const response = await fetch(
          `/api/lyrics?artist=${artist}&title=${song}`
        );
        console.log(loading);
        const data = await response.json();
        setLyrics(data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch lyrics:", error);
        setLyrics({ title: "Error fetching lyrics" }); // Handle errors
      }
    };

    fetchLyrics(); // Call the async function
  }, [artist, song]); // Dependency array to re-run useEffect when `artist` or `song` changes
  if (lyrics.lyrics && !loading) {
    return (
      <div className="bg-background rounded p-4 mb-80">
        <div className="text-center">
          {lyrics.lyrics && (
            <div className="whitespace-pre">{lyrics.lyrics}</div>
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
