'use client'

import { useWallet } from '@/hooks/useWallet'

const WALLET_ICON = 'https://www.figma.com/api/mcp/asset/0e6de79b-0f17-4853-b022-c766ab68d9ef'

interface WalletConnectProps {
  variant?: 'navbar' | 'page'
}

export default function WalletConnect({ variant = 'navbar' }: WalletConnectProps) {
  const { isConnected, isConnecting, formattedAddress, connect, disconnect } = useWallet()

  if (variant === 'page') {
    return (
      <button
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
        className="flex items-center gap-[18px] bg-[#b048ff] text-white font-nunito font-bold text-[16px] px-[16px] py-[12px] rounded-[12px] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <img src={WALLET_ICON} alt="" className="w-[25px] h-[23px]" />
        {isConnecting ? 'Connecting...' : isConnected ? formattedAddress! : 'Connect wallet'}
      </button>
    )
  }

  return (
    <button
      onClick={isConnected ? disconnect : connect}
      disabled={isConnecting}
      className="bg-[#9b22f8] text-white font-poppins text-[16px] px-6 py-3 rounded-[10px] w-[143px] h-[50px] transition-opacity hover:opacity-90 disabled:opacity-60 truncate"
    >
      {isConnecting ? 'Connecting...' : isConnected ? formattedAddress! : 'Connect'}
    </button>
  )
}
