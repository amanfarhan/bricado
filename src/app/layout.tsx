import type { Metadata } from 'next'
import { Inter, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bricado.com'),
  title: {
    default: 'BRICADO® — Advanced Wiper Blade Systems | Clear Vision. Safe Drive.',
    template: '%s | BRICADO®',
  },
  description:
    'BRICADO® engineers premium automotive wiper blade systems with Teflon coating, aerodynamic design, and all-weather performance. Trusted by dealerships, fleet operators, and car manufacturers across India.',
  keywords: [
    'Bricado',
    'wiper blades',
    'advanced wiper blades',
    'Teflon coated wipers',
    'automotive accessories',
    'flat wiper blades',
    'hybrid wiper blades',
    'car wipers India',
    'premium wiper blades',
    'aerodynamic wiper',
  ],
  authors: [{ name: 'Bricado', url: 'https://www.bricado.com' }],
  creator: 'Bricado',
  publisher: 'Bricado',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.bricado.com',
    siteName: 'BRICADO®',
    title: 'BRICADO® — Advanced Wiper Blade Systems',
    description:
      'Premium automotive wiper blade systems engineered for superior performance in all weather conditions.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BRICADO Advanced Wiper Blades',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRICADO® — Advanced Wiper Blade Systems',
    description: 'Premium automotive wiper blade systems. Clear Vision. Safe Drive.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body className="bg-dark-deep text-white antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
