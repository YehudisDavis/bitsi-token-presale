import Link from 'next/link'
import Image from 'next/image'
import WalletConnect from './WalletConnect'

const LOGO_URL = '/images/navbar-logo.png'

export default function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-8 md:px-16 py-4 w-full">
      {/* Logo */}
      <Link href="/">
        <Image src={LOGO_URL} alt="BITSI Logo" width={70} height={80} className="object-contain" />
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8 lg:gap-16">
        <a
          href="https://bitsi-next-monorepo.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-poppins text-[20px] lg:text-[26px] text-white hover:opacity-80 transition-opacity"
        >
          Bitsi website
        </a>
        <Link
          href="/docs"
          className="font-poppins text-[20px] lg:text-[26px] text-white hover:opacity-80 transition-opacity"
        >
          Docs
        </Link>
        <Link
          href="/my-coupons"
          className="font-poppins text-[20px] lg:text-[26px] text-white hover:opacity-80 transition-opacity"
        >
          My coupons
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <WalletConnect variant="navbar" />
        <span className="font-inter text-[14px] text-white font-medium">B&quot;H</span>
      </div>
    </nav>
  )
}
