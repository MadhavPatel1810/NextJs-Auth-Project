"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/utils/cn";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me");
      console.log(response.data?.data);
      setData(response.data?.data?._id);
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully", { position: "top-right" });
      router.push("/login");
    } catch (error: any) {
      console.log("Error: ", error);
      toast.error(error.message, { position: "top-right" });
    }
  };

  const dataWords =
    data === "nothing"
      ? "Nothing".split("").map((char) => ({ text: char }))
      : data.split("").map((char) => ({
          text: char,
          className: "text-blue-500 dark:text-blue-500",
        }));

  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Profile page
      </h1>
      {data === "nothing" ? (
        <TypewriterEffectSmooth words={dataWords} className="relative" />
      ) : (
        <Link href={`/profile/${data}`}>
          <TypewriterEffectSmooth words={dataWords} className="relative" />
        </Link>
      )}
      <button
        onClick={logout}
        className="relative bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="relative bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get user details
      </button>
    </div>
  );
}
