"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { createConfig, http, useReadContract } from "wagmi";
import { FUNDRAISER_CONTRACT_ADDRESS, abi } from "@/constants/constants";
import { useEffect, useState } from "react";
import { readContract, type ReadContractParameters } from "@wagmi/core";
import {  moonbaseAlpha,  } from "viem/chains";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [numCampaigns, setNumCampaigns] = useState(0);
  const [arrayOfAllCampaigns, setArrayOfAllCampaigns] = useState<any>([]);
  const config = createConfig({
    chains: [moonbaseAlpha],
    transports: {
      [moonbaseAlpha.id]: http("https://rpc.api.moonbase.moonbeam.network"),
    },
  });
  var doubleUseEffectCorrector = 0;

  // const numberOfCampaigns = useReadContract({
  //   abi,
  //   address:FUNDRAISER_CONTRACT_ADDRESS,
  //   functionName:"campaignCounter"

  // })

  // console.log(numberOfCampaigns)
  async function contractReader() {
    const numberOfCampaigns = await readContract(config, {
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName: "campaignCounter",
    });

    //@ts-ignore
    console.log(Number(numberOfCampaigns));

    //@ts-ignore
    let temparray = [];

    for (let i = 1; i <= Number(numberOfCampaigns); i++) {
      console.log(i, "is this");
      const campaign = await readContract(config, {
        abi,
        address: FUNDRAISER_CONTRACT_ADDRESS,
        functionName: "idToCampaign",
        args: [i],
      });
      console.log(campaign);
      temparray.push(campaign);
      setArrayOfAllCampaigns((prev: any) => [...prev, campaign]);
    }
  }
  useEffect(() => {
    if (doubleUseEffectCorrector < 1) {
      contractReader();
      doubleUseEffectCorrector++;
    }
  }, []);

  useEffect(() => {
    console.log(arrayOfAllCampaigns);
  }, [arrayOfAllCampaigns]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-1">
      <Navbar />
      <Image
        className="absolute h-full w-full overflow-hidden -z-10 opacity-15 blur-[4px] dark:invert-0 dark:opacity-5"
        src="/bg.png"
        width={"1920"}
        height="0"
        alt="background"
      />

      <div
        className={
          "headingDiv text-[2.5rem] text-center flex font-semibold flex-col leading-tight mt-8 text-white "
        }
      >
        <span className="text-white"> Transparent Fundraisers with</span>
        <span>
          Campaigns on <span className=" text-[#4acdc2]"> Parachains</span>
        </span>
      </div>

      <div className="border- border-white px-4 py-2 text-center text-[1.07rem] w-[34rem] text-gray-200 opacity-80 ">
        PolkaCampaign is an innovative blockchain fundraising platform
        revolutionizing and empowering global impact for positive change.
      </div>

      <div className="flex gap-6 mt-2">
        <Link href="/new-campaign">
          <Button className="text-[0.96rem] mt-2 py- flex gap-1 bg-[#348a83] hover:bg-[#26645f]">
            <span>Start a campaign{"  "}</span>{" "}
          </Button>
        </Link>

        <Link href="/explore">
          <Button className="text-[0.96rem] mt-2 py- flex gap-1 bg-white hover:bg-gray-200 text-black">
            <span>Explore campaigns {"  "}</span>{" "}
          </Button>
        </Link>
      </div>
      {/* <SignInButton mode="modal" />
    <div>
      <Authenticated>Logged in</Authenticated>
      <Unauthenticated>Logged out</Unauthenticated>

      <AuthLoading>Still loading</AuthLoading>
    </div> */}
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
