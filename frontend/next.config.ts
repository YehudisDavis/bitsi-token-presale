import type { NextConfig } from 'next'

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
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@coinbase/wallet-sdk': false,
      '@safe-global/safe-apps-sdk': false,
      '@safe-global/safe-apps-provider': false,
      '@walletconnect/ethereum-provider': false,
      '@base-org/account': false,
      porto: false,
      'porto/internal': false,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
    }
    return config
  },
}

export default nextConfig
