'use client'

import { useWallet } from '@/hooks/useWallet'

const WALLET_ICON = '/images/wallet-icon.svg'

interface WalletConnectProps {
  variant?: 'navbar' | 'page'
}

function NetworkBadge({ chainName, formattedBalance }: {
  chainName: string
  formattedBalance: string | null
}) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-poppins">
      <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
      <span className="text-green-400 font-medium">{chainName}</span>
      <span className="text-white/40">•</span>
      <span className="text-white/80">{formattedBalance ?? '0.0000 ETH'}</span>
    </div>
  )
}

export default function WalletConnect({ variant = 'navbar' }: WalletConnectProps) {
  const {
    isConnected,
    isOnSepolia,
    chainName,
    formattedAddress,
    formattedBalance,
    connect,
    disconnect,
    switchToSepolia,
  } = useWallet()

  if (isConnected && !isOnSepolia) {
    return (
      <button
        onClick={switchToSepolia}
        className={
          variant === 'page'
            ? 'flex items-center gap-3 bg-yellow-500 text-black font-nunito font-bold text-[16px] px-4 py-3 rounded-[12px] hover:bg-yellow-400 transition-colors'
            : 'flex items-center gap-[18px] bg-yellow-500 text-black font-nunito font-bold text-[16px] px-[16px] py-[12px] rounded-[12px] hover:bg-yellow-400 transition-colors'
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
        {isConnected && (
          <NetworkBadge chainName={chainName} formattedBalance={formattedBalance} />
        )}
      </div>
    )
  }

  // Navbar variant
  if (isConnected) {
    return (
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={disconnect}
          className="flex items-center gap-[18px] bg-[#b048ff] text-white font-nunito font-bold text-[16px] px-[16px] py-[12px] rounded-[12px] transition-opacity hover:opacity-90"
        >
          <img src={WALLET_ICON} alt="" className="w-[25px] h-[23px]" />
          {formattedAddress}
        </button>
        <NetworkBadge chainName={chainName} formattedBalance={formattedBalance} />
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      className="flex items-center gap-[18px] bg-[#b048ff] text-white font-nunito font-bold text-[16px] px-[16px] py-[12px] rounded-[12px] transition-opacity hover:opacity-90"
    >
      <img src={WALLET_ICON} alt="" className="w-[25px] h-[23px]" />
      Connect wallet
    </button>
  )
}
