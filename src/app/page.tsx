import {
  ArrowRight,
  Barcode,
  Camera,
  Download,
  Github,
  Palette,
  QrCode,
  ScanLine,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/button';

const features = [
  {
    icon: QrCode,
    title: '7+ QR Types',
    description:
      'Text, URL, WiFi, Email, Phone, VCard — encode anything into a scannable QR code.',
  },
  {
    icon: Barcode,
    title: 'Barcode Support',
    description:
      'Generate Code 128, EAN-13, EAN-8, UPC-A, Code 39, ITF-14 and more barcode formats.',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description:
      'Custom colors, 6 dot styles, corner designs, sizes, and embed your own logo into QR codes.',
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description:
      'Download as PNG, JPG, SVG, or WebP — optimized for print, web, or any digital media.',
  },
  {
    icon: Camera,
    title: 'Camera Scanner',
    description:
      'Scan QR codes & barcodes in real-time using your device camera with instant results.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Everything runs in your browser. No data is sent to any server — 100% client-side.',
  },
];

const stats = [
  { value: '7+', label: 'QR Types' },
  { value: '8+', label: 'Barcode Formats' },
  { value: '4', label: 'Download Formats' },
  { value: '100%', label: 'Free & Open Source' },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Glowing orbs */}
        <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
          <div className="size-[400px] rounded-full bg-primary/8 blur-[100px]" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2">
          <div className="size-[300px] rounded-full bg-primary/5 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm text-primary">
            <Sparkles className="size-4" />
            Free & Open Source — No Sign Up Required
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The Ultimate{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-primary-300 to-primary-600 bg-clip-text text-transparent">
                QR Code & Barcode
              </span>
            </span>
            <br />
            Toolkit
          </h1>

          {/* Subtext */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Generate stunning, fully customizable QR codes and barcodes. Scan
            them with your camera. Download in multiple formats. All from your
            browser — no installation needed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2 text-base shadow-lg shadow-primary/20">
              <Link href="/generator">
                <Zap className="size-5" />
                Start Generating
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="gap-2 text-base"
            >
              <Link href="/scanner">
                <ScanLine className="size-5" />
                Open Scanner
              </Link>
            </Button>
          </div>

          {/* GitHub link */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="https://github.com/MoaazMustafa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <span className="text-muted-foreground/40">•</span>
            <a
              href="https://moaazmustafa.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Shield className="size-4" />
              moaazmustafa.dev
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/20 px-4 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-primary sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              FEATURES
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything You Need in One Place
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              A comprehensive toolkit for generating and scanning QR codes and
              barcodes — built for speed, privacy, and ease of use.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/5 transition-all group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <QrCode className="size-8 text-primary" />
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Create your first QR code or barcode in seconds. No account
            needed — just pick a type, customize, and download.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2 text-base shadow-lg shadow-primary/20">
              <Link href="/generator">
                <QrCode className="size-5" />
                QR Code Generator
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="gap-2 text-base"
            >
              <Link href="/generator?tab=barcode">
                <Barcode className="size-5" />
                Barcode Generator
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
