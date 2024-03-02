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

  return (
    <nav className="bg-secondary flex items-center justify-between p-2 xl:px-[25vw] lg:px-[15vw] md:px-[5vw] px-[2vw]">
      <div className="flex items-center"> {/* Adjusted this div */}
        <a className="font-semibold" href="/">FMLyrics</a>
      </div>
      <div className="text-right"> {/* Removed flex and items-center from here */}
        {session?.user?.name ? (
          <Dropdown
            image={session?.user?.image ?? ""}
            user={session?.user?.name ?? ""}
            signOut
          />
        ) : (
          <button
            className="bg-accent p-2 rounded"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
