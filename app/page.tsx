"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Content from "./pages/content";
export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <Content />
    </>
  );
}
