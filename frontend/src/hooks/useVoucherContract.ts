'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, decodeEventLog } from 'viem'
import { VOUCHER_MANAGER_ABI } from '@/lib/abi'

const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`

// ── Purchase hook ──────────────────────────────────────────────────────────

export function usePurchaseVoucher() {
  const {
    writeContract,
    data: hash,
    isPending,
    error,
    reset,
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess,
    data: receipt,
  } = useWaitForTransactionReceipt({ hash })

  // Extract the on-chain voucherId from the VoucherPurchased event log
  let onChainId: bigint | undefined
  if (receipt) {
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: VOUCHER_MANAGER_ABI,
          data: log.data,
          topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
          eventName: 'VoucherPurchased',
        })
        onChainId = decoded.args.voucherId
        break
      } catch {
        // not this event, skip
      }
    }
  }

  const purchase = (voucherType: number, price: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: VOUCHER_MANAGER_ABI,
      functionName: 'purchaseVoucher',
      args: [BigInt(voucherType)],
      value: parseEther(price),
    })
  }

  return { purchase, hash, isPending, isConfirming, isSuccess, receipt, onChainId, error, reset }
}

// ── Redeem hook ────────────────────────────────────────────────────────────

export function useRedeemVoucher() {
  const {
    writeContract,
    data: hash,
    isPending,
    error,
    reset,
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash })

  const redeem = (voucherId: bigint, signature: `0x${string}`) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: VOUCHER_MANAGER_ABI,
      functionName: 'redeemVoucher',
      args: [voucherId, signature],
    })
  }

  return { redeem, hash, isPending, isConfirming, isSuccess, error, reset }
}
