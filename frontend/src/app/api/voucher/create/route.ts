import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface CreateVoucherBody {
  wallet: string
  amountPaid: number
  txHash: string
  voucherType: number
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateVoucherBody = await req.json()
    const { wallet, amountPaid, txHash, voucherType } = body

    if (!wallet || !amountPaid || !txHash || voucherType === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const normalizedWallet = wallet.toLowerCase()

    // Look up the template from DB
    const template = await prisma.voucherTemplate.findFirst({
      where: { voucherType },
    })

    if (!template) {
      return NextResponse.json({ error: 'Invalid voucher type' }, { status: 400 })
    }

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
        buyingPower: template.amount,
        discountPercent: 50,
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({ voucher }, { status: 201 })
  } catch (error) {
    console.error('[voucher/create]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
