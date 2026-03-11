import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, walletAddress } = body

    if (!id || !walletAddress) {
      return NextResponse.json({ error: 'id and walletAddress are required' }, { status: 400 })
    }

    const wallet = (walletAddress as string).toLowerCase()

    const voucher = await prisma.voucher.findFirst({
      where: { id, walletAddress: wallet },
    })

    if (!voucher) {
      return NextResponse.json({ error: 'Voucher not found' }, { status: 404 })
    }

    const updated = await prisma.voucher.update({
      where: { id },
      data: { status: 'REDEEMED' },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[voucher/mark-redeemed]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
