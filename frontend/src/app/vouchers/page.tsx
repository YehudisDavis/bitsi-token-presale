import VoucherCard from '@/components/VoucherCard'

const VOUCHER_TIERS = [
  { amount: 100, maxPurchase: 200 },
  { amount: 500, maxPurchase: 1000 },
  { amount: 1000, maxPurchase: 2000 },
  { amount: 10000, maxPurchase: 20000 },
]

export default function VouchersPage() {
  return (
    <main className="w-full max-w-[1400px] mx-auto px-6 md:px-16 pb-16">
      {/* Hero */}
      <section className="text-center pt-8 pb-12">
        <h1 className="font-poppins font-bold text-white text-[32px] md:text-[51px] leading-[1.2] mb-4">
          Select Your Voucher
        </h1>
        <p className="font-poppins text-white text-[18px] md:text-[30px] leading-[1.2] max-w-[800px] mx-auto mb-8">
          Choose a tier to participate and get your discount coupon.
          Voucher value = 133.33% of your participation amount.
        </p>
        <div className="w-full h-px bg-white opacity-40" />
      </section>

      {/* Voucher grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {VOUCHER_TIERS.map(tier => (
          <div key={tier.amount} className="flex justify-center">
            <VoucherCard
              amount={tier.amount}
              maxPurchase={tier.maxPurchase}
              couponId="12312445"
            />
          </div>
        ))}
      </section>
    </main>
  )
}
