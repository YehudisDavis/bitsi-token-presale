import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding VoucherTemplate catalog...')

  const templates = [
    {
      voucherType: 0,
      amount: 100,
      maxPurchase: 200,
      participation: 75,
      ethPrice: '0.001',
      validationDate: new Date('2026-06-11'),
    },
    {
      voucherType: 1,
      amount: 500,
      maxPurchase: 1000,
      participation: 375,
      ethPrice: '0.005',
      validationDate: new Date('2026-06-11'),
    },
    {
      voucherType: 2,
      amount: 1000,
      maxPurchase: 2000,
      participation: 750,
      ethPrice: '0.01',
      validationDate: new Date('2026-06-11'),
    },
    {
      voucherType: 3,
      amount: 10000,
      maxPurchase: 20000,
      participation: 7500,
      ethPrice: '0.1',
      validationDate: new Date('2026-06-11'),
    },
  ]

  for (const t of templates) {
    const existing = await prisma.voucherTemplate.findFirst({
      where: { voucherType: t.voucherType },
    })
    if (existing) {
      await prisma.voucherTemplate.update({ where: { id: existing.id }, data: t })
      console.log(`  Updated $${t.amount} template`)
    } else {
      await prisma.voucherTemplate.create({ data: t })
      console.log(`  Created $${t.amount} template`)
    }
  }

  console.log('Done.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
