"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { createConfig, http, readContract } from '@wagmi/core'
import { FUNDRAISER_CONTRACT_ADDRESS, abi } from "@/constants/constants";
import { useEffect, useState } from "react";
 import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { injected } from '@wagmi/connectors'
import Footer from "@/components/Footer";
import {workingConfig, anotherConfig} from "@/utils/utils";



export default function Home() {
  const [numCampaigns, setNumCampaigns] = useState(0);
  const [arrayOfAllCampaigns, setArrayOfAllCampaigns] = useState<any>([]);

  var doubleUseEffectCorrector = 0;

  async function contractReader() {
    const numberOfCampaigns = await readContract(workingConfig, {
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName: "campaignCounter",
    });

    //@ts-ignore

    //@ts-ignore
    let temparray = [];

    for (let i = 1; i <= Number(numberOfCampaigns); i++) {
      const campaign = await readContract(workingConfig, {
        abi,
        address: FUNDRAISER_CONTRACT_ADDRESS,
        functionName: "idToCampaign",
        args: [i],
      });
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



  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <div className="grid grid-cols-2 gap-x-32 gap-y-4 justify-center items-center p-12 " >
        {arrayOfAllCampaigns.map((campaign: any) => (<Card title={campaign[2]} funded={campaign[5] } goal={campaign[4]} description={campaign[3]} id={campaign[0]} imageUrl={campaign[1]} key={campaign[0]} />))}

      </div>
      <Footer />

    </main>
  );
}
