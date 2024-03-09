"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { FUNDRAISER_CONTRACT_ADDRESS, abi } from "@/constants/constants";

export default function NewCampaign() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fundsRequired, setFundsRequired] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("")
  const [imageUrlTemp, setImageUrlTemp] = useState("")

  const { writeContract } = useWriteContract();

  async function newCampaign() {
    const result = writeContract({
      abi,
      address: FUNDRAISER_CONTRACT_ADDRESS,
      functionName: "newCampaign",
      args: [title, description, fundsRequired, imageUrl],
    });

    console.log(result);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-white  gap-1">
      <Navbar />
      <div className="text-4xl pt-24">Start a new Campaign</div>

      <div className="flex min-h-[32rem] pt-5 mb-5 flex-col w-full items-center  ">
        <div className="grid -mt-3 w-full pb- max-w-sm items-center gap-1.5 p-5 rounded-md bg-[#1f242c]">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            className="px-1 py-1 rounded-md bg-gray-700 placeholder:text-gray-500 outline-none border-0"
          />
          <div className="mt-2">
            <Label htmlFor="title" className="mt-4">
              Image URL
            </Label>
            <div className="flex gap-4 ">
              <div className="w-[80%]">
                <Input
                  type="text"
                  id="imageUrl"
                  onChange={(e) => setImageUrlTemp(e.target.value)}
                  value={imageUrlTemp}
                  placeholder="Image URL"
                  className="px-1 py-1 rounded-md bg-gray-700 placeholder:text-gray-500 outline-none border-0"
                />
              </div>
              <div className="flex justify-center items-center">
                <Button
                  onClick={(e)=>setImageUrl(imageUrlTemp)}
                  className="bg-[#256963] text-md w-min self-center hover:bg-[#194240] "
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>

        <div className="w-full  justify-center flex">
          <div className=" w-40 self-center right-0 ">
           {imageUrl?(<img
              src={imageUrl}
              alt="Picture of the author"
              width={1000}
              height={0}
              className=" object-contain rounded-md mt-2"
            />):""} 
          </div>
          </div>

          <Label htmlFor="description" className="mt-4">
            Description
          </Label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Write a description here"
            className="px-1 py-1 h-24 rounded-md bg-gray-700 placeholder:text-gray-500  border-0"
          />
          <Label htmlFor="funds" className="mt-4">
            Funds required in wei
          </Label>
          <Input
            type="number"
            id="funds"
            placeholder="wei"
            onChange={(e) => setFundsRequired(Number(e.target.value))}
            value={fundsRequired == 0 ? "" : fundsRequired}
            className="px-1 py-1  rounded-md bg-gray-700 placeholder:text-gray-500 outline-none border-0"
          />
          <div className="flex justify-center w-full  ">
            <Button
              onClick={newCampaign}
              className="bg-[#256963] mt-6 text-md w-min self-center hover:bg-[#194240] "
            >
              Start
            </Button>
          </div>
        </div>
      </div>
      <Footer />

    </main>
    
  );
}
