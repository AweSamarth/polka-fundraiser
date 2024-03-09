'use client'

import { Progress } from "@/components/ui/progress"
import Image from "next/image";
import Link from "next/link";

export default function Card(props: {
  title: string;
  description: string;
  id: number;
  imageUrl: string;
  funded: number;
  goal: number;
}) {
  return (

    <Link href={`/campaign/${props.id}`}>
    <div className=" w-[29rem] h-[24rem] flex flex-col mt-24 bg-gray-200 hover:bg-gray-300 border-2 border-gray-400 rounded-lg shadow">
      <img
        className="rounded-t-lg object-cover w-full h-40"
        src={props.imageUrl}
        alt=""
        width={1000}
        height={10}
      />
        <div className="p-3 flex flex-col h-full justify-between border-2">

          <div>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {props.title}
            </h5>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
              {props.description}
            </p>
          </div>
          <div className="">
            <div className="">{Number(props.funded)} / {Number(props.goal)} funded</div>
            <Progress value={Number(props.funded)/Number(props.goal)*100} className="h-1"/>
          </div>
          <div className="flex w-100 justify-end">
            <div
              className="inline-flex items-center mt-3
          px-3 py-2 text-xs transition-all font-medium text-center 
          text-white bg-[#28736d] rounded-lg hover:bg-[#1c514d]
          focus:ring-2 focus:outline-none focus:ring-[#527370] 
          "
            >
              Learn more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      </Link>
  );
}
