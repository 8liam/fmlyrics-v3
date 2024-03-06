"use client"
import Navbar from "@/app/components/navbar";
import { useSession } from "next-auth/react";


export default function Profile() {
    const { data, status } = useSession();
    return (
        <>
            <Navbar />
            {status === "authenticated" ? (
                <div className="xl:px-[25vw] lg:px-[15vw] md:px-[5vw] px-[2vw] my-4">
                    <div className="bg-primary rounded p-2">
                        <h1 className="text-2xl font-bold">{data?.user?.name}</h1>
                        <p className="text-sm">{data?.user?.email}</p>
                    </div>
                </div>
            ) : (
                <div className="xl:px-[25vw] lg:px-[15vw] md:px-[5vw] px-[2vw] my-4">
                    <div className="bg-primary rounded p-2">

                        <h1 className="text-2xl font-bold">Not Authenticated</h1>
                    </div>
                </div>
            )}
        </>

    );

}

