"use client";

import { workingConfig } from "@/app/explore/page";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { abi, FUNDRAISER_CONTRACT_ADDRESS } from "@/constants/constants";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { SiPolkadot } from "react-icons/si";
import { useWriteContract } from "wagmi";
import { queryClient } from "@/app/providers";

export default function Page({ params }: { params: { slug: string } }) {
  const [campaign, setCampaign] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  var doubleUseEffectCorrector = 0;


  const { writeContract } = useWriteContract()

  const id = params.slug;

  async function contractReader() {
    const result = await readContract(workingConfig, {
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName: "idToCampaign",
      args: [id],
    });

    console.log(result)

    setCampaign(result);
    setLoading(false);
  }

  useEffect(() => {

    if (doubleUseEffectCorrector < 1) {
      contractReader();
      doubleUseEffectCorrector++;
    }
  }, []);

  async function fundCampaign(){
    console.log("this ran")
    const result = writeContract({
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName:"fundCampaign",
      args:[id],
      value: BigInt(value)
    }
      )

      queryClient.invalidateQueries()


  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white px-5 py-3  gap-1">
      <Navbar />
      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#256963]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center  gap-12 min-h-80">
          <div className=" w-[40%] ">
            <img
              src={campaign[1]}
              alt="Picture of the author"
              width={1000}
              height={0}
              className=" object-contain rounded-md"
            />
          </div>
          <div className=" w-[60%] flex flex-col  px-3 py-4 gap-6">
            <div className=" text-5xl">{campaign ? campaign[2] : ""}</div>
            <div className="flex flex-col gap-1">
              <span className=" self-end text-lg flex justify-center items-center gap-2">
                <SiPolkadot />
                {campaign && Number(campaign[5])}/
                {campaign && Number(campaign[4])} funded so far
              </span>
              <Progress
                value={campaign && Number(campaign[5]) / Number(campaign[4]) * 100}
                className="h-1"
              />
            </div>
            <div className="text-lg flex gap-2">
              <div className="flex justify-center items-center">
                <CgProfile />
              </div>
              <div>{campaign && campaign[7]}</div>
            </div>
            <div className="text-xl mb-2">{campaign && campaign[3]}</div>

            <div className="flex w-full max-w-sm self-center items-center justify-center space-x-2">
              <Input
                type="number"
                placeholder="amount "
                value={value}
                onChange={(e)=>setValue(Number(e.target.value))}
                className="text-lg  bg-gray-900 w-40 h- outline-none border-0"
              />
              <Button
                onClick={fundCampaign}
                className="bg-[#256963] text-md hover:bg-[#194240] "
              >
                Fund it!
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full absolute bottom-0">
            <Footer />
            </div>

    </main>
  );
}
