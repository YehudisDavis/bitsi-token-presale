import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const wallet = req.nextUrl.searchParams.get('wallet')

    if (!wallet) {
      return NextResponse.json({ error: 'Missing wallet parameter' }, { status: 400 })
    }

    const vouchers = await prisma.voucher.findMany({
      where: { wallet: wallet.toLowerCase() },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ vouchers })
  } catch (error) {
    console.error('[voucher/user]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
