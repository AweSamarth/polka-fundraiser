import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex h-16    w-full bg-[#28736d] items-center justify-between  fixed top-0 px-3 py-2">
      <Link href="/"><div className={"text-2xl self font-bold text-white"}>PolkaCampaign</div></Link>
      <div className="flex justify-center items-center px-8 h-[3.4rem] rounded-md  gap-8 bg-[#256963]">
        <Link href="/new-campaign"><Button className="bg-[#256963] text-white hover:bg-[#194240]">
          Start Campaign
        </Button></Link>
        <Link href="/explore"><Button className="bg-[#256963] text-white hover:bg-[#194240]">
          Explore Campaigns
        </Button></Link>
        <Link href="/public-fund"><Button className="bg-[#256963] text-white hover:bg-[#194240]">
          Public Fund
        </Button>
        </Link>

        <div>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
