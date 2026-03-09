export default function Footer() {
  const links = [
    { label: 'Our Website', href: 'https://bitsi-next-monorepo.vercel.app/' },
    { label: 'Whitepaper', href: '#' },
    { label: 'Telegram', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Docs', href: '#' },
  ]

  return (
    <footer className="w-full py-8">
      {/* Link buttons row */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.href !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="bg-[#9b22f8] text-white font-poppins text-[16px] px-6 py-3 rounded-[10px] h-[50px] flex items-center hover:opacity-90 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Partners section */}
      <div className="text-center">
        <p className="font-poppins text-[30px] text-white mb-6">Our Partners</p>
        <div className="flex flex-wrap justify-center gap-6 px-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-[#d9d9d9] w-[107px] h-[107px]" />
          ))}
        </div>
      </div>
    </footer>
  )
}
