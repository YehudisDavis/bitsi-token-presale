import VoucherCard from '@/components/VoucherCard'

// Partner logo images from Figma
const PARTNER_LOGOS = [
  'https://www.figma.com/api/mcp/asset/4e28424d-0849-4e9d-b5d8-4b6ffcad1fa5', // image47
  'https://www.figma.com/api/mcp/asset/eaafae1f-f6cc-46f1-85e6-b40d0a6e174f', // image49
  'https://www.figma.com/api/mcp/asset/0be5b09c-be7b-47c7-8f19-cc97f8b6f574', // image50
  'https://www.figma.com/api/mcp/asset/c0338e52-698a-4f37-89ff-459d9fde2595', // image51
]

const VOUCHER_TIERS = [
  { amount: 100, maxPurchase: 200 },
  { amount: 1000, maxPurchase: 2000 },
  { amount: 500, maxPurchase: 1000 },
  { amount: 10000, maxPurchase: 20000 },
]

export default function MyCouponsPage() {
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

      {/* Participation amount label */}
      <p className="font-inter text-black text-[12px] font-medium text-right mb-4">
        Participation amount <strong>$50</strong>
      </p>

      {/* Coupon grid — available tiers */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-16">
        {VOUCHER_TIERS.map(tier => (
          <div key={tier.amount} className="flex justify-center">
            <VoucherCard
              amount={tier.amount}
              maxPurchase={tier.maxPurchase}
              couponId="12312445"
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
