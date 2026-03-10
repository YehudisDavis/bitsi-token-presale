'use client'

import { useAccount, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { disconnect: wagmiDisconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const isOnSepolia = chainId === sepolia.id

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const formattedBalance = balance
    ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
    : null

  return {
    address,
    isConnected,
    isConnecting: false,
    isOnSepolia,
    connect: openConnectModal ?? (() => {}),
    disconnect: () => wagmiDisconnect(),
    switchToSepolia: () => switchChain({ chainId: sepolia.id }),
    formattedAddress: address ? formatAddress(address) : null,
    balance,
    formattedBalance,
  }
}
