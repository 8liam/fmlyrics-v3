import { getLyrics, getSong } from "genius-lyrics-api";
import { NextResponse } from "next/server";

type options = {
  title: string;
  artist: string;
  apiKey: string; // Genius developer access token
  optimizeQuery?: boolean; // (optional, default: false) If true, perform some cleanup to maximize the chance of finding a match
  authHeader?: boolean; // (optional, default: false) Whether to include auth header in the search request
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const title = url.searchParams.get("title");
    const artist = url.searchParams.get("artist");
    const options = {
      apiKey: process.env.GENIUS_API_KEY,
      title: `${title}`,
      artist: `${artist}`,
      optimizeQuery: true,
    };
    console.log(options.title);
    const lyrics = await getSong(options);
    console.log(lyrics.title);
    // Convert both strings to lowercase for a case-insensitive comparison
    const lyricsTitleLower = lyrics.title.toLowerCase();
    const optionsTitleLower = options.artist.toLowerCase();

    return NextResponse.json(lyrics);
  } catch {
    return new Response(`Error`);
  }
  // we will use params to access the data passed to the dynamic route
}
