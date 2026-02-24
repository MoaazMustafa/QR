import {
  Github,
  Globe,
  Heart,
  Mail,
  QrCode,
  ScanLine,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  tools: [
    { href: '/generator', label: 'QR Generator' },
    { href: '/generator?tab=barcode', label: 'Barcode Generator' },
    { href: '/scanner', label: 'QR & Barcode Scanner' },
  ],
  qrTypes: [
    { label: 'URL / Link' },
    { label: 'Plain Text' },
    { label: 'WiFi Network' },
    { label: 'Email Address' },
    { label: 'Phone Number' },
    { label: 'VCard Contact' },
  ],
  barcodeTypes: [
    { label: 'Code 128' },
    { label: 'EAN-13' },
    { label: 'EAN-8' },
    { label: 'UPC-A' },
    { label: 'Code 39' },
    { label: 'ITF-14' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <QrCode className="size-5 text-primary-foreground" />
              </div>
              <span className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-primary">
                QRCraft
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A free, open-source QR code & barcode toolkit. Generate
              customizable codes, scan them with your camera, and download in
              multiple formats — all from your browser.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/MoaazMustafa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://moaazmustafa.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio"
                className="flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Globe className="size-4" />
              </a>
              <a
                href="mailto:contactwithmoaaz@gmail.com"
                aria-label="Email"
                className="flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary" />
              Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Types */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <QrCode className="size-4 text-primary" />
              QR Code Types
            </h3>
            <ul className="space-y-3">
              {footerLinks.qrTypes.map((link) => (
                <li key={link.label}>
                  <span className="text-sm text-muted-foreground">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Barcode Types */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <ScanLine className="size-4 text-primary" />
              Barcode Formats
            </h3>
            <ul className="space-y-3">
              {footerLinks.barcodeTypes.map((link) => (
                <li key={link.label}>
                  <span className="text-sm text-muted-foreground">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider with gradient */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} QRCraft. Built with{' '}
            <Heart className="inline size-3.5 fill-red-500 text-red-500" /> by{' '}
            <a
              href="https://moaazmustafa.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Moaaz Mustafa
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Next.js</span>
            <span className="size-1 rounded-full bg-primary/40" />
            <span>Tailwind CSS</span>
            <span className="size-1 rounded-full bg-primary/40" />
            <span>TypeScript</span>
            <span className="size-1 rounded-full bg-primary/40" />
            <a
              href="https://github.com/MoaazMustafa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-primary"
            >
              <Github className="size-3" />
              Open Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
