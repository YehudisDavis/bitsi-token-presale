'use client'

import { useRef, useState } from 'react'
import VoucherCard from './VoucherCard'

interface Tier {
  amount: number
  maxPurchase: number
  couponId?: string
}

export default function VoucherCarousel({ tiers }: { tiers: Tier[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return
    setDragging(true)
    startX.current = e.pageX - ref.current.offsetLeft
    scrollLeft.current = ref.current.scrollLeft
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !ref.current) return
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current)
  }

  const stop = () => setDragging(false)

  return (
    <div
      ref={ref}
      className="flex gap-6 overflow-x-auto pb-6 px-8"
      style={{
        scrollbarWidth: 'none',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stop}
      onMouseLeave={stop}
    >
      {tiers.map(tier => (
        <div key={tier.amount} className="shrink-0 w-[481px]">
          <VoucherCard
            amount={tier.amount}
            maxPurchase={tier.maxPurchase}
            couponId={tier.couponId}
            isActive={false}
          />
        </div>
      ))}
    </div>
  )
}
