import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface CreateVoucherBody {
  wallet: string
  amountPaid: number
  txHash: string
}

// Voucher tiers: price in ETH → buying power + discount
const VOUCHER_TIERS: Record<number, { buyingPower: number; discountPercent: number }> = {
  0.01: { buyingPower: 0.012, discountPercent: 20 },
  0.05: { buyingPower: 0.065, discountPercent: 30 },
  0.1: { buyingPower: 0.14, discountPercent: 40 },
}

function getTierByAmount(amountPaid: number) {
  // Find the closest matching tier
  const prices = Object.keys(VOUCHER_TIERS).map(Number)
  const closest = prices.reduce((prev, curr) =>
    Math.abs(curr - amountPaid) < Math.abs(prev - amountPaid) ? curr : prev
  )
  return VOUCHER_TIERS[closest] ?? { buyingPower: amountPaid * 1.1, discountPercent: 10 }
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateVoucherBody = await req.json()
    const { wallet, amountPaid, txHash } = body

    if (!wallet || !amountPaid || !txHash) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const normalizedWallet = wallet.toLowerCase()
    const tier = getTierByAmount(amountPaid)

    // Upsert the user
    await prisma.user.upsert({
      where: { wallet: normalizedWallet },
      update: {},
      create: { wallet: normalizedWallet },
    })

    const voucher = await prisma.voucher.create({
      data: {
        wallet: normalizedWallet,
        amountPaid,
        buyingPower: tier.buyingPower,
        discountPercent: tier.discountPercent,
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({ voucher }, { status: 201 })
  } catch (error) {
    console.error('[voucher/create]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
