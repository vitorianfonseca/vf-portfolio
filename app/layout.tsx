import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({ 
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Vitória Fonseca | Computer Engineering Student & Developer',
  description: 'Portfolio of Vitória Fonseca - Computer Engineering student at IPLeiria, building products that are technically solid and genuinely beautiful to use.',
  openGraph: {
    title: 'Vitória Fonseca | Computer Engineering Student & Developer',
    description: 'Portfolio of Vitória Fonseca - Computer Engineering student at IPLeiria, building products that are technically solid and genuinely beautiful to use.',
    type: 'website',
    locale: 'en_US',
    url: 'https://vitoriafonseca.dev',
    images: [
      {
        url: '/og-image.png', // TODO: add a 1200x630 image to /public/og-image.png
        width: 1200,
        height: 630,
        alt: 'Vitória Fonseca — Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vitória Fonseca | Computer Engineering Student & Developer',
    description: 'Portfolio of Vitória Fonseca - Computer Engineering student at IPLeiria, building products that are technically solid and genuinely beautiful to use.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
