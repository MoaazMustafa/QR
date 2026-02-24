import type { Metadata } from 'next';
import { Geist, Geist_Mono, Orbitron } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import '@/styles/globals.css';
import { DisableDevTools } from '@/components/disable-devtools';
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
  title: 'QRCraft — QR Code Generator & Scanner',
  description:
    'Generate and scan QR codes instantly. Support for URLs, text, WiFi, email, phone, VCard, and more. Fully customizable with colors, dot styles, logos, and gradient support.',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/favicon-apple.png',
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
          color="#acec00"
          shadow="0 0 10px #acec00, 0 0 5px #acec00"
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

            <footer role="contentinfo" data-footer>
              {/* Footer component will be added here */}
            </footer>
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
