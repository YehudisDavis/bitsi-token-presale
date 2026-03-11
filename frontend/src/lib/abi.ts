export const VOUCHER_MANAGER_ABI = [
  // ── Constructor ───────────────────────────────────────────────
  {
    type: 'constructor',
    inputs: [{ name: '_signer', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },

  // ── Write functions ───────────────────────────────────────────

  {
    type: 'function',
    name: 'purchaseVoucher',
    inputs: [{ name: 'voucherType', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'redeemVoucher',
    inputs: [
      { name: 'voucherId', type: 'uint256', internalType: 'uint256' },
      { name: 'signature', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setSigner',
    inputs: [{ name: '_signer', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPrices',
    inputs: [
      { name: 'types', type: 'uint256[]', internalType: 'uint256[]' },
      { name: 'prices', type: 'uint256[]', internalType: 'uint256[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // ── View functions ────────────────────────────────────────────

  {
    type: 'function',
    name: 'signer',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'voucherPrices',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'redeemedVouchers',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },

  // ── Events ────────────────────────────────────────────────────

  {
    type: 'event',
    name: 'VoucherPurchased',
    inputs: [
      { name: 'buyer', type: 'address', indexed: true, internalType: 'address' },
      { name: 'voucherId', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'voucherType', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'VoucherRedeemed',
    inputs: [
      { name: 'voucherId', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'redeemer', type: 'address', indexed: true, internalType: 'address' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { name: 'previousOwner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newOwner', type: 'address', indexed: true, internalType: 'address' },
    ],
    anonymous: false,
  },

  // ── Errors ────────────────────────────────────────────────────

  { type: 'error', name: 'OwnableUnauthorizedAccount', inputs: [{ name: 'account', type: 'address' }] },
  { type: 'error', name: 'OwnableInvalidOwner', inputs: [{ name: 'owner', type: 'address' }] },
] as const
