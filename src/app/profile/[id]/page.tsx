"use client";
import { BottomGradient } from "@/components/common/commonFunction";
import { Meteors } from "@/components/ui/meteors";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { WobbleCard } from "@/components/ui/wobble-card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileDetailsPage({ params }: any) {
  const router = useRouter();
  const [data, setData] = useState({} as any);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/users/me");
        setData(response.data?.data);
      } catch (error: any) {
        console.log("Error: ", error);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 max-w-7xl mx-auto w-full">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={80}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <WobbleCard containerClassName="bg-blue-800">
          <div>
            <h2 className="text-center text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Profile Details
            </h2>
            <div className="mt-4 text-center text-base/6 text-neutral-200">
              <TextGenerateEffect words={`User ID: ${params.id}`} />
              <TextGenerateEffect words={`Username: ${data.username}`} />
              <TextGenerateEffect words={`Email Address: ${data.email}`} />
            </div>
          </div>
        </WobbleCard>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] min-w-96">
          <button
            className="cursor-pointer bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={() => router.back()}
          >
            &larr; Back to profile page
            <BottomGradient />
          </button>
        </div>
        <Meteors number={50} />
      </div>
    </>
  );
}
