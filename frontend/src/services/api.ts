const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface VoucherOption {
  id: number
  price: number
  buyingPower: number
  discount: string
}

export interface UserVoucher {
  id: string
  amount_paid: number
  buying_power: number
  status: 'active' | 'used' | 'expired'
  created_at: string
}

export interface RedeemSignatureResponse {
  signature?: string
  discount?: number
  nonce?: string
  error?: string
}

export const api = {
  getVoucherOptions: async (): Promise<VoucherOption[]> => {
    const res = await fetch(`${API_BASE}/vouchers/options`)
    if (!res.ok) throw new Error('Failed to fetch voucher options')
    return res.json()
  },

  getUserVouchers: async (wallet: string): Promise<UserVoucher[]> => {
    const res = await fetch(`${API_BASE}/vouchers/user/${wallet}`)
    if (!res.ok) throw new Error('Failed to fetch user vouchers')
    return res.json()
  },

  requestRedeemSignature: async (
    wallet: string,
    voucherId: string
  ): Promise<RedeemSignatureResponse> => {
    const res = await fetch(`${API_BASE}/vouchers/redeem-signature`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet, voucherId }),
    })
    return res.json()
  },
}
