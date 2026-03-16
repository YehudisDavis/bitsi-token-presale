export const dynamic = 'force-dynamic'

import VoucherCard from '@/components/VoucherCard'
import { prisma } from '@/lib/prisma'

// Partner logo images from Figma
const PARTNER_LOGOS = [
  '/images/partner-1.png',
  '/images/partner-2.png',
  '/images/partner-3.png',
  '/images/partner-4.png',
]

export default async function MyCouponsPage() {
  const templates = await prisma.voucherTemplate.findMany({
    where: { state: { not: 'INACTIVE' } },
    orderBy: { amount: 'asc' },
    select: { amount: true, maxPurchase: true, participation: true, voucherId: true },
  })
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

      {/* Coupon grid — available tiers */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-16">
        {templates.map(tier => (
          <div key={tier.amount} className="flex justify-center">
            <p className="font-inter text-black text-[12px] font-medium text-right mb-2">
              Participation amount <strong>${tier.participation}</strong>
            </p>
            <VoucherCard
              amount={tier.amount}
              maxPurchase={tier.maxPurchase}
              couponId={String(tier.voucherId)}
              isActive={false}
            />
          </div>
        ))}
      </section>

      {/* Active coupons section */}
      <section>
        <p className="font-poppins text-white text-[26px] text-center mb-8">
          Active coupons
        </p>

        {/* Partner logos horizontal scroll */}
        <div className="flex items-center gap-6 overflow-x-auto pb-4">
          {PARTNER_LOGOS.map((src, i) => (
            <div key={i} className="shrink-0 h-[174px] w-[379px]">
              <img
                src={src}
                alt={`Partner ${i + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
