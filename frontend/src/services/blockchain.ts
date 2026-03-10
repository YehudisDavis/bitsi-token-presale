'use client'

import { writeContract, waitForTransactionReceipt } from 'wagmi/actions'
import { wagmiConfig } from '@/lib/wagmiConfig'
import { parseEther } from 'viem'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

// Minimal ABI for the BITSI presale contract
export const PRESALE_ABI = [
  {
    name: 'purchaseVoucher',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'tier', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'redeemVoucher',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'voucherId', type: 'string' },
      { name: 'discount', type: 'uint256' },
      { name: 'nonce', type: 'string' },
      { name: 'signature', type: 'bytes' },
    ],
    outputs: [],
  },
] as const

/**
 * Sends ETH to the presale contract to purchase a voucher.
 * @param tier - Tier index (0, 1, 2…)
 * @param ethAmount - Amount to send in ETH (e.g. "0.01")
 * @returns Transaction hash
 */
export async function purchaseVoucher(tier: number, ethAmount: string): Promise<`0x${string}`> {
  if (!CONTRACT_ADDRESS) throw new Error('Contract address not configured')

  const txHash = await writeContract(wagmiConfig, {
    address: CONTRACT_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'purchaseVoucher',
    args: [BigInt(tier)],
    value: parseEther(ethAmount),
  })

  await waitForTransactionReceipt(wagmiConfig, { hash: txHash })
  return txHash
}

/**
 * Calls redeemVoucher on-chain with the backend-issued signature.
 */
export async function redeemVoucher(
  voucherId: string,
  discount: number,
  nonce: string,
  signature: `0x${string}`
): Promise<`0x${string}`> {
  if (!CONTRACT_ADDRESS) throw new Error('Contract address not configured')

  const txHash = await writeContract(wagmiConfig, {
    address: CONTRACT_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'redeemVoucher',
    args: [voucherId, BigInt(discount), nonce, signature],
  })

  await waitForTransactionReceipt(wagmiConfig, { hash: txHash })
  return txHash
}
