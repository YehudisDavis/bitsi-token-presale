import VoucherCard from './VoucherCard'

interface Props {
  amount: number
  maxPurchase: number
  validFrom?: string
  couponId?: string
  isActive?: boolean
  onUseDiscount?: () => void
}

// Each offset = how many px the ghost card is shifted below the main card (back-to-front order)
const OFFSETS = [25, 20, 14, 9, 4]

// Same coupon shape as VoucherCard — left-edge semicircle notch at mid-height
const CLIP_PATH =
  "path('M 28,0 L 453,0 Q 481,0 481,28 L 481,185 Q 481,213 453,213 L 28,213 Q 0,213 0,185 L 0,117.5 A 11,11 0 0,0 0,95.5 L 0,28 Q 0,0 28,0 Z')"

export default function StackedVoucherCard(props: Props) {
  return (
    // Height = card height (213) + max offset (25) = 238px
    <div className="relative w-full max-w-[481px]" style={{ height: '238px' }}>

      {/* Ghost cards peeking out from below — index 0 is farthest back */}
      {OFFSETS.map((offset, i) => (
        // Outer div: handles position + shadow via drop-shadow (follows clip-path shape)
        <div
          key={i}
          className="absolute inset-x-0 top-0"
          style={{
            height: '213px',
            transform: `translateY(${offset}px)`,
            zIndex: i + 1,
            filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
          }}
        >
          {/* Inner div: clip-path gives coupon shape with notch */}
          <div
            className="absolute inset-0"
            style={{ clipPath: CLIP_PATH }}
          >
            {/* Purple left strip */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#5d37c5]"
              style={{ width: '101px' }}
            />
            {/* White right area */}
            <div
              className="absolute top-0 bottom-0 right-0 bg-white"
              style={{ left: '101px' }}
            />
          </div>
        </div>
      ))}

      {/* Main card on top */}
      <div className="absolute inset-x-0 top-0" style={{ zIndex: OFFSETS.length + 1 }}>
        <VoucherCard {...props} />
      </div>

    </div>
  )
}
