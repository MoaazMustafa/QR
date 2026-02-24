import type { Metadata } from 'next';
import { Geist, Geist_Mono, Orbitron } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import '@/styles/globals.css';
import { DisableDevTools } from '@/components/disable-devtools';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ThemeProvider from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://qrcraft.dev'),
  title: {
    default: 'QRCraft — QR Code & Barcode Generator & Scanner',
    template: '%s | QRCraft',
  },
  description:
    'Generate and scan QR codes & barcodes instantly. Support for URLs, text, WiFi, email, phone, VCard, Code 128, EAN-13 and more. Fully customizable with colors, dot styles, logos, and gradient support. Free, open-source, and privacy-first.',
  keywords: [
    'qr code generator',
    'barcode generator',
    'qr scanner',
    'barcode scanner',
    'qr code maker',
    'code 128',
    'ean-13',
    'upc-a',
    'vcard qr code',
    'wifi qr code',
    'free qr code',
    'open source qr',
    'qrcraft',
  ],
  authors: [{ name: 'Moaaz Mustafa', url: 'https://moaazmustafa.dev' }],
  creator: 'Moaaz Mustafa',
  publisher: 'Moaaz Mustafa',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/favicon-apple.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qrcraft.dev',
    siteName: 'QRCraft',
    title: 'QRCraft — QR Code & Barcode Generator & Scanner',
    description:
      'Generate stunning, fully customizable QR codes and barcodes. Scan with your camera. Download in multiple formats. All in your browser.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QRCraft — QR Code & Barcode Generator & Scanner',
    description:
      'Generate stunning, fully customizable QR codes and barcodes. Scan with your camera. Download in multiple formats.',
    creator: '@MoaazMustafa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://qrcraft.dev',
  },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} font-sans antialiased`}
      >
        <NextTopLoader
          color="#800000"
          shadow="0 0 10px #800000, 0 0 5px #D44060"
          height={4}
          showSpinner
          showForHashAnchor
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <DisableDevTools />
            <Navbar />
            <main role="main" id="main-content">
              {children}
            </main>

            <Footer />
            <Toaster
              richColors
              position="bottom-right"
              toastOptions={{
                style: { fontFamily: 'var(--font-geist-sans)' },
              }}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
