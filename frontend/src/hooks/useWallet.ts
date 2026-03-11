'use client'

import { useEffect, useState } from 'react'
import { useAccount, useDisconnect, useChainId, useSwitchChain, useChains } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'
import { formatEther } from 'viem'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { disconnect: wagmiDisconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const chainId = useChainId()
  const chains = useChains()
  const { switchChain } = useSwitchChain()

  const [rawBalance, setRawBalance] = useState<string | null>(null)

  // Fetch balance directly from the wallet provider (MetaMask's own RPC)
  useEffect(() => {
    if (!address || !isConnected) {
      setRawBalance(null)
      return
    }

    const fetchBalance = async () => {
      try {
        const eth = (window as unknown as { ethereum?: { request: (args: { method: string; params: unknown[] }) => Promise<string> } }).ethereum
        if (!eth) return
        const hex = await eth.request({ method: 'eth_getBalance', params: [address, 'latest'] })
        const inEth = parseFloat(formatEther(BigInt(hex))).toFixed(4)
        setRawBalance(`${inEth} ETH`)
      } catch {
        setRawBalance(null)
      }
    }

    fetchBalance()
  }, [address, isConnected, chainId])

  const isOnSepolia = chainId === sepolia.id
  const currentChain = chains.find(c => c.id === chainId)
  const chainName = currentChain?.name ?? `Chain ${chainId}`

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return {
    address,
    isConnected,
    isConnecting: false,
    isOnSepolia,
    chainName,
    connect: openConnectModal ?? (() => {}),
    disconnect: () => wagmiDisconnect(),
    switchToSepolia: () => switchChain({ chainId: sepolia.id }),
    formattedAddress: address ? formatAddress(address) : null,
    formattedBalance: rawBalance,
  }
}
