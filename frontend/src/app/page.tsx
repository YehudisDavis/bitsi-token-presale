import Link from 'next/link'
import Footer from '@/components/Footer'

const LINE_IMG = '/images/line.svg'

export default function HomePage() {
  return (
    <main className="w-full">
      {/* Hero section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-16 pt-8 pb-16 text-center">
        {/* Main heading */}
        <h1 className="font-poppins text-white leading-[1.2] mb-4">
          <span className="block font-bold text-[32px] md:text-[51px]">
            Become a partner of launching BITSI
          </span>
          <span className="block font-normal text-[28px] md:text-[43px]">
            The protection layer for crypto holders
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-poppins text-white text-[18px] md:text-[30px] leading-[1.2] mb-8 max-w-[1000px] mx-auto">
          Join the BITSI launch and receive a bonus voucher for your first BITSI purchase.
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white opacity-40 mb-8" />

        {/* Offer section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8 text-left">
          {/* Left — discount info */}
          <div className="flex-1">
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="font-poppins font-bold text-white text-[80px] md:text-[100px] leading-none">
                50%
              </span>
              <span className="font-poppins text-white text-[24px] md:text-[30px] font-normal">
                Discount coupon
              </span>
            </div>
            <p className="font-poppins text-white text-[18px] md:text-[30px] leading-[1.2] mt-2">
              Voucher value = 133.33% of your participation amount.
            </p>
          </div>

          {/* Right — example */}
          <div className="flex-1 max-w-[492px]">
            <p className="font-poppins font-bold text-white text-[22px] md:text-[26px] leading-[1.2] mb-2">
              For example
            </p>
            <p className="font-poppins text-white text-[18px] md:text-[26px] leading-[1.4]">
              Contribute $300 - get a $400 voucher
              <br />
              Use it as a 50% discount on purchases up to $800.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white opacity-40 mb-10" />

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <Link href="/vouchers">
            <button className="bg-[#9b22f8] text-white font-poppins font-bold text-[40px] md:text-[54px] leading-[1.2] px-12 py-6 rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity">
              Participate &amp; Get Coupons
            </button>
          </Link>
        </div>
      </section>

      {/* Footer with links + partners */}
      <Footer />
    </main>
  )
}
