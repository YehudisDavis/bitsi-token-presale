'use client'

interface TransactionStatusProps {
  hash?: `0x${string}`
  isPending: boolean
  isConfirming: boolean
  isSuccess: boolean
  error?: Error | null
  successMessage?: string
}

const SEPOLIA_EXPLORER = 'https://sepolia.etherscan.io/tx/'

export default function TransactionStatus({
  hash,
  isPending,
  isConfirming,
  isSuccess,
  error,
  successMessage = 'Transaction confirmed!',
}: TransactionStatusProps) {
  if (!isPending && !isConfirming && !isSuccess && !error) return null

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Pending wallet approval */}
      {isPending && (
        <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.1)] border border-white/20 rounded-[12px] px-4 py-3">
          <span className="animate-spin text-lg">⏳</span>
          <p className="font-inter text-white text-sm">Waiting for wallet approval…</p>
        </div>
      )}

      {/* In mempool / confirming */}
      {isConfirming && hash && (
        <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.1)] border border-yellow-400/40 rounded-[12px] px-4 py-3">
          <span className="animate-pulse text-lg">🔄</span>
          <div>
            <p className="font-inter text-white text-sm">Confirming on Sepolia…</p>
            <a
              href={`${SEPOLIA_EXPLORER}${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[#b048ff] text-xs hover:underline"
            >
              {hash.slice(0, 10)}…{hash.slice(-8)} ↗
            </a>
          </div>
        </div>
      )}

      {/* Success */}
      {isSuccess && hash && (
        <div className="flex items-center gap-3 bg-green-900/30 border border-green-400/40 rounded-[12px] px-4 py-3">
          <span className="text-lg">✅</span>
          <div>
            <p className="font-inter text-green-300 text-sm font-medium">{successMessage}</p>
            <a
              href={`${SEPOLIA_EXPLORER}${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[#b048ff] text-xs hover:underline"
            >
              View on Etherscan ↗
            </a>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-900/30 border border-red-400/40 rounded-[12px] px-4 py-3">
          <span className="text-lg shrink-0">❌</span>
          <p className="font-inter text-red-300 text-sm break-all">
            {(error as { shortMessage?: string }).shortMessage ?? error.message}
          </p>
        </div>
      )}
    </div>
  )
}
