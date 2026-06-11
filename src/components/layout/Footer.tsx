import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/technology', label: 'Technology' },
    { href: '/industries', label: 'Industries' },
    { href: '/distribution', label: 'Distribution' },
  ],
  Products: [
    { href: '/products#advanced', label: 'Advanced Wipers' },
    { href: '/products#flat', label: 'Flat Wiper Blades' },
    { href: '/products#hybrid', label: 'Hybrid Wipers' },
    { href: '/products#conventional', label: 'Conventional Wipers' },
  ],
  Connect: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/distribution', label: 'Dealership Inquiry' },
    { href: '/distribution#wholesale', label: 'Wholesale' },
    { href: '/distribution#export', label: 'Export' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-dark-deep border-t border-dark-border">
      {/* Main footer */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center mb-6">
              <Image
                src="/logo-white.png"
                alt="Bricado"
                width={160}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-silver-dark text-sm leading-relaxed max-w-xs mb-6">
              Engineered for superior performance. Bricado advanced wiper blade systems deliver
              uncompromising clarity in every condition.
            </p>
            <p className="text-label text-orange mb-8">"Clear Vision. Safe Drive."</p>
            <div className="space-y-2 text-sm text-silver-dark">
              <a href="tel:+917025575112" className="flex items-center gap-3 hover:text-orange transition-colors duration-200">
                <span className="text-orange text-xs">TEL</span>
                +91 7025 575 112
              </a>
              <a href="mailto:info.bricado@gmail.com" className="flex items-center gap-3 hover:text-orange transition-colors duration-200">
                <span className="text-orange text-xs">EMAIL</span>
                info.bricado@gmail.com
              </a>
              <span className="flex items-center gap-3">
                <span className="text-orange text-xs">WEB</span>
                www.bricado.com
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-label text-silver mb-5">{section}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-silver-dark hover:text-orange transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-silver-dark">
            © {new Date().getFullYear()} Bricado®. All rights reserved.
          </p>
          <p className="text-xs text-silver-dark tracking-widest uppercase">
            Engineered in India
          </p>
        </div>
      </div>
    </footer>
  )
}
