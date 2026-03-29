export const dynamic = 'force-dynamic'

import VoucherCard from '@/components/VoucherCard'
import { prisma } from '@/lib/prisma'

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
        <h1 className="font-poppins font-bold text-white text-[36px] md:text-[63px] leading-[1.2] mb-6 max-w-[1087px] mx-auto">
          Join the BITSI launch and unlock exclusive coupon savings
        </h1>
        <div className="w-full h-px bg-white opacity-40 mt-8" />
      </section>

      {/* Your coupons */}
      <section className="mb-8">
        <p className="font-poppins font-bold text-white text-[30px] text-center mb-8">
          Your coupons
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {templates.map(tier => (
            <div key={tier.amount} className="flex justify-center">
              <VoucherCard
                amount={tier.amount}
                maxPurchase={tier.maxPurchase}
                couponId={String(tier.voucherId)}
                isActive={true}
              />
            </div>
          ))}
        </div>
      </section>

      {/* DEX description */}
      <p className="font-poppins text-white text-[20px] md:text-[30px] leading-[1.2] text-center max-w-[1079px] mx-auto">
        When you choose to use the coupon, you will be directed to a DEX, where you can redeem it by paying the remaining 1/3 in order to receive the coupon&apos;s full value.
      </p>

    </main>
  )
}
