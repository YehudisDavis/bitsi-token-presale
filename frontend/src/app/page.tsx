import { prisma } from '@/lib/prisma'
import VoucherCarousel from '@/components/VoucherCarousel'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const templates = await prisma.voucherTemplate.findMany({
    where: { state: { not: 'INACTIVE' } },
    orderBy: { amount: 'asc' },
    select: { amount: true, maxPurchase: true, voucherId: true },
  })

  const tiers = templates.map(t => ({
    amount: t.amount,
    maxPurchase: t.maxPurchase,
    couponId: String(t.voucherId),
  }))

  return (
    <main className="w-full">

      {/* Hero text */}
      <section className="max-w-[1087px] mx-auto pt-8 text-center">
        <h1 className="font-poppins font-bold text-white leading-[1.2] mb-8" style={{ fontSize: 'clamp(32px, 3.65vw, 63px)' }}>
          Join the BITSI launch and unlock exclusive coupon savings
        </h1>
        <p className="font-poppins text-white leading-[1.2]" style={{ fontSize: 'clamp(18px, 1.97vw, 34px)' }}>
          For every $100 paid today, you can contribute another $100 during redemption in the DEV and receive BITSI worth $300 total
        </p>
      </section>

      {/* Get 33.3% Discount — all inline on one line */}
      <div className="text-center mt-10 mb-12 px-4">
        <span className="font-poppins font-bold text-white leading-[1.05]" style={{ fontSize: 'clamp(28px, 2.89vw, 50px)' }}>Get</span>
        <span className="font-poppins font-bold text-white leading-[1.05]" style={{ fontSize: 'clamp(50px, 5.79vw, 100px)' }}>{' '}33.3%{' '}</span>
        <span className="font-poppins font-bold text-white leading-[1.05]" style={{ fontSize: 'clamp(28px, 2.89vw, 50px)' }}>Discount</span>
      </div>

      {/* Voucher carousel */}
      <div className="mb-12">
        <VoucherCarousel tiers={tiers} />
      </div>

      {/* Our Partners */}
      <p className="font-poppins text-white leading-[1.2] text-center mb-6" style={{ fontSize: 'clamp(18px, 1.74vw, 30px)' }}>Our Partners</p>
      <div className="w-full px-[9%] flex items-center justify-between pb-16 flex-wrap gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-[107px] h-[107px] bg-[#d9d9d9]" />
        ))}
      </div>

    </main>
  )
}
