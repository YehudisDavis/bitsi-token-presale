'use client'

import Link from 'next/link'

const COUPON_BG = 'https://www.figma.com/api/mcp/asset/2203da1f-1136-430d-bfd8-c3c2f4f87f69'
const LOGO = 'https://www.figma.com/api/mcp/asset/54b3d275-6269-4692-ba57-bc4b92388bb8'

interface VoucherCardProps {
  amount: number
  maxPurchase: number
  validFrom?: string
  couponId?: string
  isActive?: boolean
  onUseDiscount?: () => void
}

// Coupon shape with left-edge semicircle notch at mid-height
const CLIP_PATH =
  "path('M 28,0 L 453,0 Q 481,0 481,28 L 481,185 Q 481,213 453,213 L 28,213 Q 0,213 0,185 L 0,117.5 A 11,11 0 0,0 0,95.5 L 0,28 Q 0,0 28,0 Z')"

export default function VoucherCard({
  amount,
  maxPurchase,
  validFrom = '11/06/2026',
  couponId = '12312445',
  isActive = false,
  onUseDiscount,
}: VoucherCardProps) {
  return (
    <div className="relative w-full max-w-[481px] h-[213px]">

      {/* Card — clipped to coupon shape with real punch-hole notches */}
      <div
        className="absolute inset-0 flex items-stretch"
        style={{
          clipPath: CLIP_PATH,
          filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
        }}
      >
        {/* Coupon background image (purple gradient side) */}
        <div className="absolute inset-0">
          <img
            src={COUPON_BG}
            alt=""
            className="absolute max-w-none"
            style={{
              width: '230.175px',
              height: '240px',
              left: 'calc(50% - 125.82px)',
              top: 'calc(50% - 0.2px)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Left — DISCOUNT label */}
        <div className="relative shrink-0 flex items-center justify-center w-[101px]">
          <div className="-rotate-90 flex-none">
            <div className="flex flex-col items-start justify-center px-[17px] w-[213px]">
              <p className="font-manrope font-bold text-[28px] leading-[42px] text-center text-white w-full">
                DISCOUNT
              </p>
            </div>
          </div>
          {/* Coupon ID at bottom of purple strip */}
          <p className="absolute bottom-3 font-manrope text-[12px] text-[#d2d2d2] text-center w-full">
            {couponId}
          </p>
        </div>

        {/* Right — white content area */}
        <div className="relative flex-1 bg-white rounded-tr-[22px] rounded-br-[22px]">

          {/* Valid from */}
          <p
            className="absolute font-manrope font-medium text-[#5b5760] text-[12px] leading-[28px]"
            style={{ left: '16.95px', top: '3px', width: '136px' }}
          >
            Valid from: {validFrom}
          </p>

          {/* Amount */}
          <p
            className="absolute font-manrope font-bold text-[#232027] text-[37px] leading-[39px] whitespace-nowrap"
            style={{ left: '16.84px', top: '29px' }}
          >
            ${amount.toLocaleString()}
          </p>

          {/* Description + Terms */}
          <p
            className="absolute font-manrope font-medium text-[16px] leading-[28px]"
            style={{ left: '16.84px', top: '69px', width: '346px' }}
          >
            <span className="text-[#5b5760]">
              50% off - in purchase till {maxPurchase.toLocaleString()} USD
            </span>
            <br />
            <span className="text-[#3c0eb9]">*Terms &amp; conditions</span>
          </p>

          {/* Participate button */}
          <Link
            href={`/buy?amount=${amount}`}
            className={`absolute flex items-center justify-center w-[158px] py-[8px] rounded-[22px] border border-[#ece7f8] font-manrope font-bold text-[16px] leading-[28px] text-white whitespace-nowrap overflow-hidden transition-opacity ${
              isActive
                ? 'bg-[#c8c8c8] pointer-events-none'
                : 'bg-[#5d37c5] hover:opacity-90'
            }`}
            style={{ left: '24.95px', top: '152px' }}
          >
            Participate
          </Link>

          {/* Use discount button */}
          <button
            onClick={onUseDiscount}
            disabled={!isActive}
            className={`absolute flex items-center justify-center w-[158px] py-[8px] rounded-[22px] border border-[#ece7f8] font-manrope font-bold text-[16px] leading-[28px] text-white whitespace-nowrap overflow-hidden transition-opacity ${
              isActive
                ? 'bg-[#5d37c5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:opacity-90 cursor-pointer'
                : 'bg-[#c8c8c8] cursor-not-allowed'
            }`}
            style={{ left: '197.95px', top: '152px' }}
          >
            Use discount
          </button>
        </div>
      </div>

      {/* BITSI logo — outside the clipped area so it's not cut */}
      <div
        className="absolute pointer-events-none"
        style={{ left: '85.45%', right: '4.99%', top: '15px', aspectRatio: '1135/1280' }}
      >
        <img src={LOGO} alt="BITSI" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  )
}
