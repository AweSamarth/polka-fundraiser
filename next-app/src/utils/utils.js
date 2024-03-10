import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, moonbaseAlpha } from 'wagmi/chains'
import {injected} from 'wagmi/connectors'

export const workingConfig = createConfig({
    chains: [sepolia, moonbaseAlpha],
    connectors: [injected()], 
    transports: {
      [moonbaseAlpha.id]: http("https://rpc.api.moonbase.moonbeam.network"),
      [sepolia.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_RPC_PROVIDER),
    },
  
  }); 
  
  export const anotherConfig = createConfig({
    chains: [sepolia],
    connectors: [injected()], 
    transports: {
      [sepolia.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_RPC_PROVIDER),
    },
  
  })
  