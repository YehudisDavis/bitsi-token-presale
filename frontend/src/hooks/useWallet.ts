'use client'

import { useState, useCallback } from 'react'

interface WalletState {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
  })

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true }))
    try {
      if (typeof window !== 'undefined' && (window as unknown as { ethereum?: { request: (args: { method: string }) => Promise<string[]> } }).ethereum) {
        const eth = (window as unknown as { ethereum: { request: (args: { method: string }) => Promise<string[]> } }).ethereum
        const accounts = await eth.request({ method: 'eth_requestAccounts' })
        setState({ address: accounts[0], isConnected: true, isConnecting: false })
      } else {
        // Demo fallback
        setState({
          address: '0x742d35Cc6634C0532925a3b8D4C9DE8ae4D35Cf',
          isConnected: true,
          isConnecting: false,
        })
      }
    } catch {
      setState(prev => ({ ...prev, isConnecting: false }))
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({ address: null, isConnected: false, isConnecting: false })
  }, [])

  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`

  return {
    ...state,
    connect,
    disconnect,
    formattedAddress: state.address ? formatAddress(state.address) : null,
  }
}
