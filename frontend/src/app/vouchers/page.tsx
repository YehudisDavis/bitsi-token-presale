export const dynamic = 'force-dynamic'

import StackedVoucherCard from '@/components/StackedVoucherCard'
import VoucherCarousel from '@/components/VoucherCarousel'
import { prisma } from '@/lib/prisma'

export default async function VouchersPage() {
  const templates = await prisma.voucherTemplate.findMany({
    where: { state: { not: 'INACTIVE' } },
    orderBy: { amount: 'asc' },
  })

  const VOUCHER_TIERS = templates.map(t => ({
    amount: t.amount,
    maxPurchase: t.maxPurchase,
    couponId: String(t.voucherId),
  }))
  return (
    <main className="w-full pb-16 overflow-x-hidden">

      {/* Hero */}
      <section className="text-center px-6 pt-8 pb-6 max-w-[1100px] mx-auto">
        <h1 className="font-poppins text-white leading-[1.2]">
          <span className="block font-bold text-[51px]">
            Become a partner of lunching BITSI
          </span>
          <span className="block font-normal text-[43px]">
            the protection layer for crypto holders
          </span>
        </h1>
        <p className="font-poppins font-normal text-white text-[30px] leading-[1.2] mt-4 max-w-[900px] mx-auto">
          Join the BITSI launch and receive a bonus voucher for your BITSI purchase.
        </p>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-white opacity-40 mb-10" />

      {/* Voucher grid — 2 columns, stacked cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 px-6 md:px-16 max-w-[1400px] mx-auto">
        {VOUCHER_TIERS.map(tier => (
          <div key={tier.amount} className="flex justify-center">
            <StackedVoucherCard
              amount={tier.amount}
              maxPurchase={tier.maxPurchase}
              couponId={tier.couponId}
            />
          </div>
        ))}
      </section>

      {/* Active coupons carousel */}
      <section className="mt-20">
        <h2 className="font-poppins font-normal text-white text-[26px] text-center mb-8">
          Active coupons
        </h2>
        <VoucherCarousel tiers={VOUCHER_TIERS} />
      </section>

    </main>
  )
}
