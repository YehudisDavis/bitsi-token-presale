'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { useRedeemVoucher } from '@/hooks/useVoucherContract'
import { api, UserVoucher } from '@/services/api'
import VoucherCard from '@/components/VoucherCard'
import WalletConnect from '@/components/WalletConnect'

export default function RedeemPage() {
  const { address, isConnected } = useWallet()
  const { redeem, isPending, isConfirming, isSuccess, error, reset } = useRedeemVoucher()

  const [vouchers, setVouchers] = useState<UserVoucher[]>([])
  const [selected, setSelected] = useState<UserVoucher | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [markedDone, setMarkedDone] = useState(false)
  const [redeemError, setRedeemError] = useState<string | null>(null)

  // Fetch user's active vouchers when wallet connects
  useEffect(() => {
    if (!address) { setVouchers([]); return }
    setLoading(true)
    setFetchError(null)
    api.getUserVouchers(address)
      .then(data => setVouchers(data.vouchers.filter(v => v.status === 'ACTIVE')))
      .catch(() => setFetchError('Failed to load vouchers'))
      .finally(() => setLoading(false))
  }, [address])

  // After tx confirms → request signature → call contract → mark redeemed in DB
  const handleRedeem = async () => {
    if (!selected || !address) return
    reset()
    setMarkedDone(false)
    setRedeemError(null)

    const sigData = await api.requestRedeemSignature(address, selected.id)
    if (sigData.error) { setRedeemError(sigData.error); return }

    redeem(BigInt(sigData.voucherId), sigData.signature)
  }

  // After on-chain tx confirms → mark redeemed in DB
  useEffect(() => {
    if (!isSuccess || !selected || !address || markedDone) return

    fetch('/api/voucher/mark-redeemed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, walletAddress: address }),
    })
      .then(() => {
        setMarkedDone(true)
        setVouchers(prev => prev.filter(v => v.id !== selected.id))
        setSelected(null)
      })
      .catch(() => setRedeemError('Redeemed on-chain but failed to update DB'))
  }, [isSuccess, selected, address, markedDone])

  const isLoading = isPending || isConfirming

  return (
    <main className="w-full max-w-[1400px] mx-auto px-6 md:px-16 pb-16">
      {/* Hero */}
      <section className="text-center pt-8 pb-12">
        <h1 className="font-poppins text-white leading-[1.2] mb-4">
          <span className="block font-bold text-[32px] md:text-[51px]">
            Use your BITSI voucher
          </span>
          <span className="block font-normal text-[28px] md:text-[43px]">
            Apply your discount to a BITSI purchase
          </span>
        </h1>
        <div className="w-full h-px bg-white opacity-40 mt-8" />
      </section>

      {/* Connect wallet */}
      <div className="flex justify-center mb-10">
        <WalletConnect variant="page" />
      </div>

      {!isConnected && (
        <p className="text-center text-white/60 text-[18px]">Connect your wallet to see your vouchers</p>
      )}

      {isConnected && loading && (
        <p className="text-center text-white/60 text-[18px]">Loading your vouchers...</p>
      )}

      {isConnected && !loading && fetchError && (
        <p className="text-center text-red-400 text-[16px]">{fetchError}</p>
      )}

      {isConnected && !loading && !fetchError && vouchers.length === 0 && (
        <p className="text-center text-white/60 text-[18px]">
          You have no active vouchers.{' '}
          <a href="/vouchers" className="text-[#b048ff] underline">Buy one here.</a>
        </p>
      )}

      {/* Voucher list */}
      {vouchers.length > 0 && (
        <section className="max-w-[960px] mx-auto">
          <p className="font-poppins text-white text-[22px] mb-6">Select a voucher to redeem:</p>
          <div className="flex flex-col gap-6 mb-10">
            {vouchers.map(v => (
              <div
                key={v.id}
                onClick={() => { if (!isLoading) setSelected(v) }}
                className={`cursor-pointer rounded-[28px] transition-all ${selected?.id === v.id ? 'ring-4 ring-[#b048ff]' : 'opacity-80 hover:opacity-100'}`}
              >
                <VoucherCard
                  amount={v.buyingPower}
                  maxPurchase={v.buyingPower * 2}
                  couponId={v.id.slice(0, 8)}
                  isActive={true}
                />
              </div>
            ))}
          </div>

          {/* Status messages */}
          {isSuccess && markedDone && (
            <div className="bg-green-500/20 border border-green-500 text-green-300 rounded-[8px] px-4 py-3 mb-4 text-[14px]">
              Voucher redeemed successfully! Your discount has been applied.
            </div>
          )}
          {(error || redeemError) && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-[8px] px-4 py-3 mb-4 text-[14px]">
              {redeemError ?? error?.message}
            </div>
          )}
          {isConfirming && (
            <p className="text-white/70 text-[14px] mb-4">Waiting for confirmation on-chain...</p>
          )}

          <button
            onClick={handleRedeem}
            disabled={!selected || isLoading}
            className="bg-[#5d37c5] text-white font-inter text-[14px] text-center rounded-[8px] w-[200px] h-[38px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Confirm in wallet...' : isConfirming ? 'Processing...' : 'Use discount'}
          </button>
        </section>
      )}
    </main>
  )
}
