'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import VoucherCard from '@/components/VoucherCard'

interface Voucher {
  id: string
  wallet: string
  amountPaid: number
  buyingPower: number
  discountPercent: number
  status: 'ACTIVE' | 'REDEEMED' | 'EXPIRED'
  nonce: string
  createdAt: string
}

export default function MyCouponsPage() {
  const { address, isConnected } = useAccount()
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return
    setLoading(true)
    fetch(`/api/voucher/user?wallet=${address.toLowerCase()}`)
      .then(r => r.json())
      .then(data => setVouchers(data.vouchers ?? []))
      .finally(() => setLoading(false))
  }, [address])

  return (
    <main className="w-full max-w-[1400px] mx-auto px-6 md:px-16 pb-16">

      {/* Hero */}
      <section className="text-center pt-8 pb-8">
        <h1 className="font-poppins font-bold text-white leading-[1.2] max-w-[1087px] mx-auto" style={{ fontSize: 'clamp(32px, 3.65vw, 63px)' }}>
          My Coupons
        </h1>
        <div className="w-full h-px bg-white opacity-40 mt-6" />
      </section>

      {/* Content */}
      <section className="mb-8">
        {!isConnected ? (
          <p className="font-poppins text-white text-[20px] text-center mt-12">
            Connect your wallet to see your coupons.
          </p>
        ) : loading ? (
          <p className="font-poppins text-white text-[20px] text-center mt-12">
            Loading...
          </p>
        ) : vouchers.length === 0 ? (
          <p className="font-poppins text-white text-[20px] text-center mt-12">
            You have no coupons yet.
          </p>
        ) : (
          <>
            <p className="font-poppins font-bold text-white text-[30px] text-center mb-8">
              Your coupons
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {vouchers.map(v => (
                <div key={v.id} className="flex justify-center">
                  <VoucherCard
                    amount={v.buyingPower}
                    maxPurchase={v.amountPaid}
                    couponId={v.nonce}
                    isActive={v.status === 'ACTIVE'}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* DEX description */}
      {isConnected && vouchers.length > 0 && (
        <p className="font-poppins text-white text-[20px] md:text-[30px] leading-[1.2] text-center max-w-[1079px] mx-auto">
          When you choose to use the coupon, you will be directed to a DEX, where you can redeem it by paying the remaining 1/3 in order to receive the coupon&apos;s full value.
        </p>
      )}

    </main>
  )
}
