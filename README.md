# PolkaCampaign
PolkaCampaign is a decentralized crowdfunding platform built on Moonbase alphanet. Users can easily create campaigns and get them funded by the community. It also has a public fund where users can donate to the fund and the fund goes to a random campaign on the platform. 

## Key Features
- Randomness guaranteed by Acurast's decentralized compute
- GetBlock used as an RPC provider
- Written in Solidity and deployed on Moonbase alphanet
- One can upload images as their campaign's cover
- All denominations are in wei (10^-18DEV) for better readability
- Close-to-zero onboarding friction since people with Ethereum wallets like MetaMask can directly start using the platform. This makes mass adoption possible

## USP
### Using human psychology to make the platform more appealing to users and fund campaigns fast. 
The public fund treasury can be broken after every two donations on the platform, be those to a campaign or the public fund. The person who breaks the treasury gets to keep 10% of the public fund while a random campaign gets the remaining 90%. Users' greed will drive them to fund more and more, thinking they might be the next one to break the treasury and get the rewards. Net profit here will probabilistically be for campaigns, not users.

## Tech Stack
- Smart contract: Solidity
- Frontend: Nextjs, TailwindCSS, RainbowKit, Wagmi, Viem, shadcnui, react-icons
- Foundry used as smart contract development development kit
- GetBlock and Acurast
