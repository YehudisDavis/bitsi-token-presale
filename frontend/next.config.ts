import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Stub MetaMask SDK — browser extension works via window.ethereum without it
      '@metamask/sdk': path.resolve(__dirname, 'src/mocks/metamask-sdk.js'),
    }
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@coinbase/wallet-sdk': false,
      '@safe-global/safe-apps-sdk': false,
      '@safe-global/safe-apps-provider': false,
      '@walletconnect/ethereum-provider': false,
      '@base-org/account': false,
      porto: false,
      'porto/internal': false,
    }
    return config
  },
}

export default nextConfig
