import { Button } from "./ui/button";
import { GithubIcon, TwitterIcon, Mail } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiTwitter, SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <div className="flex h-12 w-full text-white bg-[#28736d] items-center justify-between  bottom-0 px-4 py-2">
      <div className={" self "}>© 2024 PolkaCampaign</div>
      <div className="flex justify-center items-center rounded-md  gap-8 ">
        <div className="items-center gap-6 flex">
          <Link href="https://github.com/awesamarth" rel="noreferrer noopener" target="_blank"><SiGithub /></Link>
          <Link href="https://twitter.com/awesamarth_" rel="noreferrer noopener" target="_blank"><SiTwitter /></Link>
          <Link href="https://linkedin.com/in/awesamarth" rel="noreferrer noopener" target="_blank"><SiLinkedin /></Link>
        </div>
      </div>
    </div>
  );
}