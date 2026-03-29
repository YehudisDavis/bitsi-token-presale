'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import VoucherCard from '@/components/VoucherCard'
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

type CoinId = 'BITSI' | 'BTC' | 'ETH' | 'USDT' | 'SOL'

const COIN_CONFIG: Record<CoinId, {
  src: string
  label: string
  type: 'eth' | 'manual' | 'soon'
  address?: string
  network?: string
}> = {
  BITSI: { src: '/images/coin-bitsi.png', label: 'BITSI', type: 'soon' },
  BTC:   { src: '/images/coin-btc.svg',   label: 'BTC',   type: 'manual', address: 'bc1q7n2s5ks8z4ak25r9ywuwelwmtmnyqz3d5h4esp', network: 'Bitcoin' },
  ETH:   { src: '/images/coin-eth.svg',   label: 'ETH',   type: 'eth' },
  USDT:  { src: '/images/coin-usdt.svg',  label: 'USDT',  type: 'soon' },
  SOL:   { src: '/images/coin-sol.svg',   label: 'SOL',   type: 'manual', address: '3GHCjJscstdR2FTQueZ9th4rSVDbzXt9okZwKsikHb9L', network: 'Solana' },
}

const COIN_ORDER: CoinId[] = ['BTC', 'ETH', 'USDT', 'BITSI', 'SOL']

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
  const [selectedCoin, setSelectedCoin] = useState<CoinId>('ETH')
  const [manualTxHash, setManualTxHash] = useState('')
  const [manualSaved, setManualSaved] = useState(false)
  const [manualSaving, setManualSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  const coin = COIN_CONFIG[selectedCoin]

  const handleSelectCoin = (id: CoinId) => {
    setSelectedCoin(id)
    setManualTxHash('')
    setManualSaved(false)
    setSaveError(null)
  }

  // After ETH tx confirms → save voucher to DB
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

  const handleConfirmEth = () => {
    if (!voucher) return
    reset()
    setSaved(false)
    setSaveError(null)
    sendTransaction({ to: RECEIVING_WALLET, value: parseEther(voucher.ethPrice) })
  }

  const handleConfirmManual = async () => {
    if (!manualTxHash.trim() || !voucher || !address) return
    setManualSaving(true)
    setSaveError(null)
    try {
      const res = await fetch('/api/voucher/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: address,
          amountPaid: parseFloat(voucher.ethPrice),
          txHash: manualTxHash.trim(),
          voucherType: voucher.voucherType,
        }),
      })
      const data = await res.json()
      if (data.error) setSaveError(data.error)
      else setManualSaved(true)
    } catch {
      setSaveError('Failed to save voucher')
    } finally {
      setManualSaving(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isEthLoading = isPending || isConfirming
  const isDone = (coin.type === 'eth' && isSuccess && saved) || (coin.type === 'manual' && manualSaved)

  return (
    <main className="w-full max-w-[1400px] mx-auto px-6 md:px-16 pb-16">
      {/* Hero */}
      <section className="text-center pt-8 pb-12">
        <h1 className="font-poppins font-bold text-white text-[36px] md:text-[63px] leading-[1.2] mb-6 max-w-[1087px] mx-auto">
          Join the BITSI launch and unlock exclusive coupon savings
        </h1>
      </section>

      {/* Coupon */}
      <section className="flex justify-center mb-8">
        <VoucherCard
          amount={voucher.amount}
          maxPurchase={voucher.maxPurchase}
          couponId={String(voucher.voucherId)}
          isActive={false}
          compact
        />
      </section>

      {/* Purchase panel */}
      <section className="max-w-[960px] mx-auto">
        <div className="px-4 pb-4">
          <h2 className="font-poppins text-white text-[30px] leading-[1.2]">Get the coupon</h2>
          <p className="font-inter text-[#ececec] text-[14px] mt-1">
            Review your policy upgrade details before activating.
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

        {/* Payment method selector */}
        <div className="backdrop-blur-[70px] bg-[rgba(60,53,74,0.5)] border-2 border-[rgba(255,255,255,0.5)] rounded-[20px] p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <p className="font-inter font-bold text-white text-[18px] md:text-[21px]">Select payment method</p>
            <p className="font-inter font-bold text-[#00ba34] text-[18px] md:text-[21px]">
              (${voucher.participation})
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {COIN_ORDER.map(id => {
              const c = COIN_CONFIG[id]
              return (
                <button
                  key={id}
                  onClick={() => handleSelectCoin(id)}
                  disabled={c.type === 'soon'}
                  title={c.type === 'soon' ? `${id} — coming soon` : id}
                  className={`relative bg-white border rounded-[13px] w-[65px] h-[42px] flex items-center justify-center transition-all ${
                    selectedCoin === id
                      ? 'border-[#5d37c5] shadow-[0_0_0_2px_#5d37c5]'
                      : 'border-[#d6dce5] hover:border-[#5d37c5]'
                  } ${c.type === 'soon' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <Image src={c.src} alt={c.label} width={26} height={26} className="object-contain" />
                  {c.type === 'soon' && (
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[8px] rounded-full px-1 leading-[14px]">
                      soon
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Manual payment panel (BTC / SOL) */}
          {coin.type === 'manual' && coin.address && (
            <div className="mt-4 p-3 bg-[rgba(0,0,0,0.3)] rounded-[12px]">
              <p className="font-inter text-white text-[13px] mb-2">
                Send <span className="font-bold text-[#00ba34]">{voucher.ethPrice} ETH worth</span> of {coin.label} to your {coin.network} address:
              </p>
              <div className="flex items-center gap-2 mb-3">
                <code className="flex-1 bg-[rgba(255,255,255,0.1)] text-white text-[11px] px-3 py-2 rounded-[8px] break-all">
                  {coin.address}
                </code>
                <button
                  onClick={() => handleCopy(coin.address!)}
                  className="shrink-0 bg-[#5d37c5] text-white text-[12px] px-3 py-2 rounded-[8px] hover:opacity-90 transition-opacity"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="font-inter text-white/60 text-[12px] mb-1">
                After sending, paste your transaction hash here:
              </p>
              <input
                type="text"
                value={manualTxHash}
                onChange={e => setManualTxHash(e.target.value)}
                placeholder="Transaction hash..."
                className="w-full bg-[rgba(255,255,255,0.1)] text-white text-[13px] px-3 py-2 rounded-[8px] outline-none border border-white/20 focus:border-[#5d37c5] placeholder:text-white/40"
              />
            </div>
          )}
        </div>

        <p className="font-manrope font-medium text-white text-[16px] mb-4">
          Coupon will be valid from: 11/06/2026
        </p>

        {/* Status messages */}
        {isDone && (
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

        {coin.type === 'eth' && (
          <button
            onClick={isDone ? () => window.location.href = '/vouchers' : handleConfirmEth}
            disabled={!isConnected || isEthLoading}
            className="bg-[#b048ff] text-white font-inter text-[14px] text-center rounded-[8px] w-[200px] h-[38px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Confirm in wallet...' : isConfirming ? 'Processing...' : isDone ? 'Done!' : 'Confirm'}
          </button>
        )}
        {coin.type === 'manual' && (
          <button
            onClick={isDone ? () => window.location.href = '/vouchers' : handleConfirmManual}
            disabled={!isConnected || (!isDone && (!manualTxHash.trim() || manualSaving))}
            className="bg-[#b048ff] text-white font-inter text-[14px] text-center rounded-[8px] w-[200px] h-[38px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {manualSaving ? 'Saving...' : isDone ? 'Done!' : 'Confirm'}
          </button>
        )}

      </section>

      {/* Social icons */}
      <div className="mt-12">
        <img src="/images/social-icons.webp" alt="Social media" className="h-[34px] w-auto" />
      </div>
    </main>
  )
}
