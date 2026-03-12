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

export default function StackedVoucherCard(props: Props) {
  return (
    // Height = card height (213) + max offset (25) = 238px
    <div className="relative w-full max-w-[481px]" style={{ height: '238px' }}>

      {/* Ghost cards peeking out from below — index 0 is farthest back */}
      {OFFSETS.map((offset, i) => (
        <div
          key={i}
          className="absolute inset-x-0 top-0 rounded-[28px] overflow-hidden"
          style={{
            height: '213px',
            transform: `translateY(${offset}px)`,
            zIndex: i + 1,
            boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
          }}
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
      ))}

      {/* Main card on top */}
      <div className="absolute inset-x-0 top-0" style={{ zIndex: OFFSETS.length + 1 }}>
        <VoucherCard {...props} />
      </div>

    </div>
  )
}
