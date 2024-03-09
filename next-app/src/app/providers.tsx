"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  moonbaseAlpha,
  zora,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

// export const moonbaseAlpha ={
//   id:1287,
//   name:"Moonbase Alpha",
//   network:"moonbase-alphanet",
//   iconUrl:"https://pbs.twimg.com/profile_images/1726717071856218112/jRpGqkB0_400x400.jpg",
//   iconBackground:"#000000",
//   nativeCurrency:  {
//     decimals:18,
//     name:'DEV',
//     symbol:'DEV'
//   },
//   rpcUrls:{
//     default:{
//       http:["https://rpc.api.moonbase.moonbeam.network"]
// // public rpc url
//     },
//   },
//   blockExplorers:{
//     default:{name:"Moonbase Alpha Testnet Explorer", url:"https://moonbase.moonscan.io/"}
//   },
//   testnet:true

// }


const { wallets } = getDefaultWallets();

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    moonbaseAlpha,
  ],
  ssr: true,
});

export const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
