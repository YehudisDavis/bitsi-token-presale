export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import BuyContent from './BuyContent'

export default async function BuyPage() {
  const templates = await prisma.voucherTemplate.findMany({
    where: { state: { not: 'INACTIVE' } },
    orderBy: { amount: 'asc' },
    select: {
      amount: true,
      maxPurchase: true,
      participation: true,
      voucherType: true,
      ethPrice: true,
      voucherId: true,
    },
  })

  return (
    <Suspense>
      <BuyContent templates={templates} />
    </Suspense>
  )
}
