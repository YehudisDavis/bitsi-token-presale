import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Providers } from '@/providers/Providers'

export const metadata: Metadata = {
  title: 'BITSI — Become a Partner',
  description: 'Join the BITSI launch and receive a bonus voucher for your first BITSI purchase.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Manrope:wght@400;500;700&family=Inter:wght@400;500;700&family=Nunito:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen"
        style={{ background: 'linear-gradient(to bottom, #0133e9, #6c28ee)' }}
      >
        <Providers>
          <div
            className="min-h-screen"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
