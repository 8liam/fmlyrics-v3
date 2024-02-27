import { getLyrics, getSong } from "genius-lyrics-api";
import { NextResponse } from "next/server";
import { Client } from "genius-lyrics";

type options = {
  title: string;
  artist: string;
  apiKey: string; // Genius developer access token
  optimizeQuery?: boolean; // (optional, default: false) If true, perform some cleanup to maximize the chance of finding a match
  authHeader?: boolean; // (optional, default: false) Whether to include auth header in the search request
};

export async function GET(request: Request) {
  try {
    const client = new Client();
    const url = new URL(request.url);
    const title = url.searchParams.get("title");
    const artist = url.searchParams.get("artist");
    if (title && artist && title.length > 0 && artist.length > 0) {
      try {
        const searches = await client.songs.search(
          `${decodeURIComponent(title as string)} ${decodeURIComponent(
            title.length > 1 ? (artist as string) : ""
          )}`
        );
        const song = searches[0];
        const lyrics = await song?.lyrics();


        // Corrected usage
        const response = NextResponse.json({
          lyrics: lyrics,
          title: song?.title,
          artist: song?.artist.name,
          album: song?.album?.name,
          albumArt: song?.album?.image,
          releaseDate: song?.releasedAt,
          image: song?.image,
        });
        response.headers.set("Content-Type", "application/json");
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set(
          "Cache-Control",
          "public, s-maxage=86400, stale-while-revalidate=43200"
        );
        return response;
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Lyrics not found" });
      }
    } else {
      return NextResponse.json({ error: "Bad request" });
    }
  }
  catch (error) {
    console.log(error);
  }
}

