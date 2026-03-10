export interface VoucherOption {
  id: number
  price: number
  ethAmount: string
  buyingPower: number
  discountPercent: number
}

export interface UserVoucher {
  id: string
  wallet: string
  amountPaid: number
  buyingPower: number
  discountPercent: number
  status: 'ACTIVE' | 'REDEEMED' | 'EXPIRED'
  nonce: string
  createdAt: string
  redeemedAt: string | null
}

export interface CreateVoucherResponse {
  voucher: UserVoucher
}

export interface RedeemSignatureResponse {
  signature: `0x${string}`
  voucherId: string
  discount: number
  nonce: string
  error?: string
}

// Static tier definitions (mirrors the backend tier logic)
export const VOUCHER_OPTIONS: VoucherOption[] = [
  { id: 0, price: 0.01, ethAmount: '0.01', buyingPower: 0.012, discountPercent: 20 },
  { id: 1, price: 0.05, ethAmount: '0.05', buyingPower: 0.065, discountPercent: 30 },
  { id: 2, price: 0.1,  ethAmount: '0.1',  buyingPower: 0.14,  discountPercent: 40 },
]

export const api = {
  createVoucher: async (
    wallet: string,
    amountPaid: number,
    txHash: string
  ): Promise<CreateVoucherResponse> => {
    const res = await fetch('/api/voucher/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet, amountPaid, txHash }),
    })
    if (!res.ok) throw new Error('Failed to create voucher')
    return res.json()
  },

  getUserVouchers: async (wallet: string): Promise<{ vouchers: UserVoucher[] }> => {
    const res = await fetch(`/api/voucher/user?wallet=${encodeURIComponent(wallet)}`)
    if (!res.ok) throw new Error('Failed to fetch user vouchers')
    return res.json()
  },

  requestRedeemSignature: async (
    wallet: string,
    voucherId: string
  ): Promise<RedeemSignatureResponse> => {
    const res = await fetch('/api/voucher/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet, voucherId }),
    })
    return res.json()
  },
}
