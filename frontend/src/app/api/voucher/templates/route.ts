import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/voucher/templates          → all visible templates
// GET /api/voucher/templates?id=<id>  → single template by id
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')

    if (id) {
      const template = await prisma.voucherTemplate.findUnique({ where: { id } })
      if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(template)
    }

    // Return all visible templates (everything except INACTIVE)
    const templates = await prisma.voucherTemplate.findMany({
      where: { state: { not: 'INACTIVE' } },
      orderBy: { amount: 'asc' },
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error('[voucher/templates]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
