import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Dropdown from "./dropdown";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [song, setPlaying] = useState([]);
  const [name, setTrackName] = useState("");
  const [artist, setArtist] = useState("");

  if (session?.user?.name) {
    return (
      <>
        <nav className="bg-secondary flex items-center justify-between p-2 px-[25vw]">
          <h1 className="font-semibold text-xl">FMLyrics</h1>

          <div className="text-right">
            <Dropdown
              image={session?.user?.image ?? ""}
              user={session?.user?.name ?? ""}
              signOut
            />
          </div>
        </nav>
      </>
    );
  }
  if (!session || !session?.user?.name) {
    return (
      <nav className="bg-secondary flex items-center justify-between p-2 px-[25vw]">
        <div className="flex-grow text-center">
          <h1 className="font-semibold">FMLyrics</h1>
        </div>
        <div className="text-right px-2 flex items-center"></div>
        <div className="text-right">
          <button className="bg-blue-800 p-2 rounded" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      </nav>
    );
  }
}
