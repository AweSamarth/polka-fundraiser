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
import { createConfig, http, injected, readContract } from "@wagmi/core";
import { SiPolkadot } from "react-icons/si";
import { useWriteContract, useSwitchChain } from "wagmi";
import { sepolia } from "viem/chains";

import { queryClient } from "../providers";

export default function Page({ params }: { params: { slug: string } }) {
  const [publicFundBalance, setPublicFundBalance] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isRunPublicFundActive, setIsRunPublicFundActive] = useState(false);
  const [value, setValue] = useState(0);
  var doubleUseEffectCorrector = 0;

  const { writeContract } = useWriteContract();

  const { chains, switchChain } = useSwitchChain();

  async function contractReader() {
    const result = await readContract(workingConfig, {
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName: "publicFundBalance",
    });

    setPublicFundBalance(result);

    console.log(result)
    setLoading(false);
  }

  const anotherConfig = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http("https://rpc.sepolia.org"),
    },
  
  });

  async function checkIsRunPublicFundActive() {
    const isRunPublicFundActive = await readContract(anotherConfig, {
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName: "isRunPublicFundActive",
    });

    console.log(isRunPublicFundActive);
    //@ts-ignore
    setIsRunPublicFundActive(isRunPublicFundActive);
  }

  useEffect(() => {
    if (doubleUseEffectCorrector < 1) {
      contractReader();
      checkIsRunPublicFundActive()
      doubleUseEffectCorrector++;
    }
  }, []);

  async function fundPublicFund() {
    console.log("this ran");
    const result = writeContract({
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName: "fundPublicFund",
      value: BigInt(value),
    });

    queryClient.invalidateQueries()

  }

  async function breakTreasury() {
    const result = writeContract({
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName: "runPublicFund",
      args: [1],
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white   gap-1">
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
            <Image
              src="/treasure.png"
              alt="Picture of the author"
              width={1000}
              height={0}
              className=" object-contain rounded-md"
            />
          </div>
          <div className=" w-[60%] flex flex-col  px-3 py-4 gap-6">
            <div className=" text-5xl">Public Fund</div>
            <div className="flex flex-col gap-1">
              <Progress value={0} className="h-1" />
            </div>
            <div className="text-xl mb-2">
              The public fund treasury becomes break-able every two times the
              public fund or a campaign on the platform gets funded. When
              broken, 90% of the treasury's balance goes to a random campaign
              and the remaining 10% goes to the person who breaks the treasury.
              If you see a break treasury button below, click it and get 10% of
              the treasury's balance!
            </div>

            <div className="flex self-center">
              Current balance of the treasury is:{" "}
              {publicFundBalance ? Number(publicFundBalance) : 0}
            </div>

            <div className="flex w-full max-w-sm self-center items-center justify-center space-x-2">
              <Input
                type="number"
                placeholder="amount "
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="text-lg  bg-gray-900 w-40 h- outline-none border-0"
              />
              <Button
                onClick={fundPublicFund}
                className="bg-[#256963] text-md hover:bg-[#194240] "
              >
                Fund it!
              </Button>
              {isRunPublicFundActive && (
                <Button
                className="bg-[#256963] text-md hover:bg-[#194240]"
                onClick={breakTreasury}
                >
                  Break Treasury
                </Button>
              )}

              <Button
                className="bg-[#256963] text-md hover:bg-[#194240]"
                onClick={checkIsRunPublicFundActive}
              ></Button>
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
