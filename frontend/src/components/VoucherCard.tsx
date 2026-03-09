import Link from 'next/link'

const COUPON_BG = 'https://www.figma.com/api/mcp/asset/28c34e29-6d69-4c21-86c1-6baf1cc94b2c'
const LOGO_URL = 'https://www.figma.com/api/mcp/asset/9d6575fb-b279-4887-8d83-6caa93417b55'

interface VoucherCardProps {
  amount: number
  maxPurchase: number
  validFrom?: string
  couponId?: string
  participationAmount?: number
  isActive?: boolean
  onUseDiscount?: () => void
}

export default function VoucherCard({
  amount,
  maxPurchase,
  validFrom = '11/06/2026',
  couponId = '12312445',
  isActive = false,
  onUseDiscount,
}: VoucherCardProps) {
  return (
    <div className="relative flex rounded-[28px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full max-w-[481px] h-[213px]">
      {/* Left purple side */}
      <div
        className="relative shrink-0 flex items-center justify-center overflow-hidden"
        style={{ width: '101px' }}
      >
        <img
          src={COUPON_BG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <p
          className="relative font-manrope font-bold text-white text-[28px] tracking-widest"
          style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}
        >
          DISCOUNT
        </p>
        <p
          className="absolute bottom-2 font-manrope font-medium text-[10px] text-[#d2d2d2]"
          style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', fontSize: '10px' }}
        >
          {couponId}
        </p>
      </div>

      {/* Right white side */}
      <div className="flex-1 bg-white relative rounded-br-[22px] rounded-tr-[22px] px-4 pt-3 pb-4">
        {/* BITSI logo */}
        <img
          src={LOGO_URL}
          alt="BITSI"
          className="absolute top-2 right-3 w-9 h-9 object-contain"
        />

        {/* Valid from */}
        <p className="font-manrope font-medium text-[#5b5760] text-[12px]">
          Valid from: {validFrom}
        </p>

        {/* Amount */}
        <p className="font-manrope font-bold text-[#232027] text-[37px] leading-none mt-2">
          ${amount.toLocaleString()}
        </p>

        {/* Description */}
        <p className="font-manrope font-medium text-[#5b5760] text-[14px] leading-[22px] mt-1">
          50% off - in purchase till {maxPurchase.toLocaleString()} USD
        </p>
        <p className="font-manrope font-medium text-[#3c0eb9] text-[14px]">
          *Terms &amp; conditions
        </p>

        {/* Buttons */}
        <div className="absolute bottom-3 left-4 flex gap-3">
          <Link href={`/redeem?amount=${amount}`}>
            <button className="bg-[#5d37c5] border border-[#ece7f8] text-white font-manrope font-bold text-[14px] px-6 py-2 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity">
              Participate
            </button>
          </Link>
          <button
            onClick={onUseDiscount}
            disabled={!isActive}
            className={`border border-[#ece7f8] text-white font-manrope font-bold text-[14px] px-6 py-2 rounded-full transition-opacity ${
              isActive
                ? 'bg-[#5d37c5] hover:opacity-90 cursor-pointer'
                : 'bg-[#c8c8c8] cursor-not-allowed opacity-80'
            }`}
          >
            Use discount
          </button>
        </div>
      </div>
    </div>
  )
}
