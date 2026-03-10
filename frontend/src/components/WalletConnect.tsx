'use client'

import { useWallet } from '@/hooks/useWallet'

const WALLET_ICON = 'https://www.figma.com/api/mcp/asset/0e6de79b-0f17-4853-b022-c766ab68d9ef'

interface WalletConnectProps {
  variant?: 'navbar' | 'page'
}

export default function WalletConnect({ variant = 'navbar' }: WalletConnectProps) {
  const {
    isConnected,
    isOnSepolia,
    formattedAddress,
    formattedBalance,
    connect,
    disconnect,
    switchToSepolia,
  } = useWallet()

  // Wrong network warning
  if (isConnected && !isOnSepolia) {
    return (
      <button
        onClick={switchToSepolia}
        className={
          variant === 'page'
            ? 'flex items-center gap-3 bg-yellow-500 text-black font-nunito font-bold text-[16px] px-4 py-3 rounded-[12px] hover:bg-yellow-400 transition-colors'
            : 'bg-yellow-500 text-black font-poppins text-[14px] px-4 py-2 rounded-[10px] h-[50px] hover:bg-yellow-400 transition-colors'
        }
      >
        Switch to Sepolia
      </button>
    )
  }

  if (variant === 'page') {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={isConnected ? disconnect : connect}
          className="flex items-center gap-[18px] bg-[#b048ff] text-white font-nunito font-bold text-[16px] px-[16px] py-[12px] rounded-[12px] transition-opacity hover:opacity-90"
        >
          <img src={WALLET_ICON} alt="" className="w-[25px] h-[23px]" />
          {isConnected ? formattedAddress! : 'Connect wallet'}
        </button>
        {isConnected && formattedBalance && (
          <span className="text-white/70 font-inter text-[13px]">{formattedBalance}</span>
        )}
      </div>
    )
  }

  // Navbar variant
  if (isConnected) {
    return (
      <button
        onClick={disconnect}
        className="bg-[#9b22f8] text-white font-poppins text-[14px] px-4 py-2 rounded-[10px] h-[50px] transition-opacity hover:opacity-90 flex flex-col items-center justify-center leading-tight min-w-[143px]"
      >
        <span className="truncate max-w-[130px]">{formattedAddress}</span>
        {formattedBalance && (
          <span className="text-white/70 text-[11px]">{formattedBalance}</span>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={connect}
      className="bg-[#9b22f8] text-white font-poppins text-[16px] px-6 py-3 rounded-[10px] w-[143px] h-[50px] transition-opacity hover:opacity-90"
    >
      Connect
    </button>
  )
}
