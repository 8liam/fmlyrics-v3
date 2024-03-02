"use client";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
type DropdownProps = {
  image: string;
  user: string;
  signOut: any;
};
export default function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const image = props.image;
  const name = props.user;
  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 p-1 bg-accent text-white rounded-md focus:outline-none focus:ring-2 focus:bg-accent/50 focus:ring-opacity-50 flex items-center"
      >
        <p className="pr-2 font-semibold">{name} </p>

        <Image
          src={image}
          width={25}
          height={25}
          className="rounded-full w-8 h-8"
          alt={name}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-gray-800 shadow-md rounded-md py-1 z-50">

          <a
            href={`/profile`}
            className="block px-4 py-2 text-sm text-white hover:bg-gray-100 duration-300 hover:text-black text-right "
          >
            Profile
          </a>
          {/*
          <a
            href="#"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-100 duration-300 hover:text-black text-right "
          >
            Link 2
          </a>
          */}
          <a
            href="#"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-100 duration-300 hover:text-black text-right  "
            onClick={() => signOut()}
          >
            <LogoutIcon fontSize="small" color="error" /> Log Out
          </a>
        </div>
      )}
    </div>
  );
}
