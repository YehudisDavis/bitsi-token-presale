'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import VoucherCard from '@/components/VoucherCard'
import WalletConnect from '@/components/WalletConnect'
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useWallet } from '@/hooks/useWallet'

interface VoucherTemplate {
  amount: number
  maxPurchase: number
  participation: number
  voucherType: number
  ethPrice: string
  voucherId: number
}

const COINS = [
  { src: 'https://www.figma.com/api/mcp/asset/29762bdd-41fb-4d03-82fd-11f9c1985fd6', label: 'BITSI' },
  { src: 'https://www.figma.com/api/mcp/asset/04c4c9bb-3e11-4d39-8e38-42ce41a3610c', label: 'BTC' },
  { src: 'https://www.figma.com/api/mcp/asset/62a8ab74-f0db-4b79-a754-5c3bb2ba9c62', label: 'ETH' },
  { src: 'https://www.figma.com/api/mcp/asset/d0ee4123-c5d9-49c5-91b3-15c711a3fb67', label: 'USDT' },
  { src: 'https://www.figma.com/api/mcp/asset/114da9ae-cbe5-461f-80cc-167d2c930dc0', label: 'SOL' },
]

const AMOUNT_BADGE_BG = 'https://www.figma.com/api/mcp/asset/2dbac468-2528-42f3-8a78-ef1227a3f258'

export default function BuyContent({ templates }: { templates: VoucherTemplate[] }) {
  const searchParams = useSearchParams()
  const amountParam = Number(searchParams.get('amount') ?? templates[0]?.amount)
  const voucher = templates.find(t => t.amount === amountParam) ?? templates[0]

  const RECEIVING_WALLET = process.env.NEXT_PUBLIC_RECEIVING_WALLET as `0x${string}`

  const { address, isConnected } = useWallet()
  const { sendTransaction, data: hash, isPending, error, reset } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // After tx confirms on-chain → save voucher to DB
  useEffect(() => {
    if (!isSuccess || !hash || !voucher || !address || saved) return

    fetch('/api/voucher/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wallet: address,
        amountPaid: parseFloat(voucher.ethPrice),
        txHash: hash,
        voucherType: voucher.voucherType,
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) setSaveError(data.error)
        else setSaved(true)
      })
      .catch(() => setSaveError('Failed to save voucher'))
  }, [isSuccess, hash, voucher, address, saved])

  const handleConfirm = () => {
    if (!voucher) return
    reset()
    setSaved(false)
    setSaveError(null)
    sendTransaction({
      to: RECEIVING_WALLET,
      value: parseEther(voucher.ethPrice),
    })
  }

  const isLoading = isPending || isConfirming

  return (
    <main className="w-full max-w-[1400px] mx-auto px-6 md:px-16 pb-16">
      {/* Hero */}
      <section className="text-center pt-8 pb-12">
        <h1 className="font-poppins text-white leading-[1.2] mb-4">
          <span className="block font-bold text-[32px] md:text-[51px]">
            Become a partner of launching BITSI
          </span>
          <span className="block font-normal text-[28px] md:text-[43px]">
            The protection layer for crypto holders
          </span>
        </h1>
        <p className="font-poppins text-white text-[18px] md:text-[30px] leading-[1.2] max-w-[1000px] mx-auto">
          Join the BITSI launch and receive a bonus voucher for your BITSI purchase.
        </p>
        <div className="w-full h-px bg-white opacity-40 mt-8" />
      </section>

      {/* Coupon + badge row */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <VoucherCard
          amount={voucher.amount}
          maxPurchase={voucher.maxPurchase}
          couponId={String(voucher.voucherId)}
          isActive={false}
        />

        {/* Participation amount circle */}
        <div className="relative flex items-center justify-center shrink-0 w-[138px] h-[138px]">
          <img src={AMOUNT_BADGE_BG} alt="" className="absolute inset-0 w-full h-full object-cover rounded-full" />
          <span className="relative font-inter font-bold text-[18px] text-black">
            ${voucher.participation}
          </span>
        </div>
      </section>

      {/* Connect wallet */}
      <div className="flex justify-center mb-10">
        <WalletConnect variant="page" />
      </div>

      {/* Purchase panel */}
      <section className="max-w-[960px] mx-auto">
        <div className="px-4 pb-4">
          <h2 className="font-poppins text-white text-[30px] leading-[1.2]">Get the coupon</h2>
          <p className="font-inter text-[#ececec] text-[14px] mt-1">
            Review your details before purchasing.
          </p>
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-[9px] mb-4">
          <div className="bg-[rgba(26,17,29,0.7)] flex items-center gap-4 h-[72px] px-4 py-2 rounded-[16px]">
            <div className="bg-[#293038] rounded-[8px] w-[48px] h-[48px] shrink-0" />
            <div>
              <p className="font-inter font-medium text-white text-[16px] leading-[24px]">Coupon amount</p>
              <p className="font-inter font-bold text-white text-[18px]">${voucher.amount.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-[rgba(26,17,29,0.7)] flex items-center gap-4 h-[72px] px-4 py-2 rounded-[16px]">
            <div className="bg-[#293038] rounded-[8px] w-[48px] h-[48px] shrink-0" />
            <div>
              <p className="font-inter font-medium text-white text-[16px] leading-[24px]">Participation amount</p>
              <p className="font-inter font-bold text-white text-[18px]">${voucher.participation}</p>
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="backdrop-blur-[70px] bg-[rgba(60,53,74,0.5)] border-2 border-[rgba(255,255,255,0.5)] rounded-[20px] p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <p className="font-inter font-bold text-white text-[18px] md:text-[21px]">Select payment method</p>
            <p className="font-inter font-bold text-[#00ba34] text-[18px] md:text-[21px]">
              (${voucher.amount.toLocaleString()})
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {COINS.map(coin => (
              <button
                key={coin.label}
                className="bg-white border border-[#d6dce5] rounded-[13px] w-[65px] h-[42px] flex items-center justify-center hover:border-[#5d37c5] transition-colors"
                title={coin.label}
              >
                <img src={coin.src} alt={coin.label} className="w-[26px] h-[26px] object-contain" />
              </button>
            ))}
          </div>
        </div>

        <p className="font-manrope font-medium text-white text-[16px] mb-4">
          Coupon will be valid from: 11/06/2026
        </p>

        {/* Status messages */}
        {isSuccess && saved && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 rounded-[8px] px-4 py-3 mb-4 text-[14px]">
            Voucher purchased! Check &quot;My Coupons&quot; to see it.
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-[8px] px-4 py-3 mb-4 text-[14px]">
            Transaction failed: {error.message}
          </div>
        )}
        {saveError && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-[8px] px-4 py-3 mb-4 text-[14px]">
            {saveError}
          </div>
        )}
        {isConfirming && (
          <p className="text-white/70 text-[14px] mb-4">Waiting for confirmation on-chain...</p>
        )}

        <button
          onClick={handleConfirm}
          disabled={!isConnected || isLoading || (isSuccess && saved)}
          className="bg-[#b048ff] text-white font-inter text-[14px] text-center rounded-[8px] w-[200px] h-[38px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Confirm in wallet...' : isConfirming ? 'Processing...' : isSuccess && saved ? 'Done!' : 'Confirm'}
        </button>

        {!isConnected && (
          <p className="text-white/60 text-[12px] mt-2">Connect your wallet to proceed</p>
        )}
      </section>
    </main>
  )
}
