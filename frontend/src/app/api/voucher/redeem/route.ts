import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { privateKeyToAccount } from 'viem/accounts'
import { encodePacked, keccak256 } from 'viem'

interface RedeemBody {
  voucherId: string
  wallet: string
}

export async function POST(req: NextRequest) {
  try {
    const body: RedeemBody = await req.json()
    const { voucherId, wallet } = body

    if (!voucherId || !wallet) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const voucher = await prisma.voucher.findUnique({
      where: { id: voucherId },
    })

    if (!voucher) {
      return NextResponse.json({ error: 'Voucher not found' }, { status: 404 })
    }

    if (voucher.wallet !== wallet.toLowerCase()) {
      return NextResponse.json({ error: 'Wallet mismatch' }, { status: 403 })
    }

    if (voucher.status !== 'ACTIVE') {
      return NextResponse.json({ error: `Voucher is ${voucher.status.toLowerCase()}` }, { status: 400 })
    }

    const privateKey = process.env.SIGNER_PRIVATE_KEY
    if (!privateKey) {
      return NextResponse.json({ error: 'Signer not configured' }, { status: 500 })
    }

    const account = privateKeyToAccount(privateKey as `0x${string}`)

    // Sign: keccak256(abi.encodePacked(voucherId, discount, nonce, wallet))
    const messageHash = keccak256(
      encodePacked(
        ['string', 'uint256', 'string', 'address'],
        [voucher.id, BigInt(voucher.discountPercent), voucher.nonce, wallet as `0x${string}`]
      )
    )

    const signature = await account.signMessage({ message: { raw: messageHash } })

    return NextResponse.json({
      signature,
      voucherId: voucher.id,
      discount: voucher.discountPercent,
      nonce: voucher.nonce,
    })
  } catch (error) {
    console.error('[voucher/redeem]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
