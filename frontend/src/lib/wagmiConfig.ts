import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  injectedWallet,
  rabbyWallet,
  braveWallet,
  frameWallet,
} from '@rainbow-me/rainbowkit/wallets'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Browser Wallets',
      wallets: [injectedWallet, rabbyWallet, braveWallet, frameWallet],
    },
  ],
  { appName: 'BITSI Presale', projectId: 'none' }
)

export const wagmiConfig = createConfig({
  connectors,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.sepolia.org'
    ),
  },
  ssr: true,
})
