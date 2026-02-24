'use client';

import {
  ArrowDown,
  Download,
  Palette,
  QrCode,
  ScanLine,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/button';
import { QRGenerator } from '@/components/qr/qr-generator';

const features = [
  {
    icon: QrCode,
    title: '7+ QR Types',
    description:
      'Text, URL, WiFi, Email, Phone, VCard — encode anything into a scannable QR code.',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description:
      'Custom colors, 6 dot styles, corner designs, and embed your own logo into the QR code.',
  },
  {
    icon: Download,
    title: 'Instant Download',
    description:
      'Download your QR code as PNG, JPG, SVG, or WebP — ready for print or digital use.',
  },
  {
    icon: ScanLine,
    title: 'Built-in Scanner',
    description:
      'Scan QR codes using your camera or upload an image. Get instant decoded results.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-16">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Glowing orb */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
          <div className="size-[500px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="size-4" />
            Free & Open Source QR Tool
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Generate & Scan{' '}
            <span className="bg-gradient-to-r from-primary via-primary-300 to-primary-600 bg-clip-text text-transparent">
              QR Codes
            </span>{' '}
            Instantly
          </h1>

          {/* Subtext */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Create beautiful, customizable QR codes for URLs, WiFi, contacts,
            and more. Scan them right from your browser — no app needed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="gap-2 text-base"
              onClick={() =>
                document
                  .getElementById('generator')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <Zap className="size-5" />
              Generate QR Code
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="gap-2 text-base"
            >
              <Link href="/scanner">
                <ScanLine className="size-5" />
                Scan QR Code
              </Link>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ArrowDown className="mx-auto size-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">
              Everything You Need
            </h2>
            <p className="text-muted-foreground">
              A complete QR code toolkit right in your browser
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">
              Create Your QR Code
            </h2>
            <p className="text-muted-foreground">
              Choose a type, enter your content, customize the style, and
              download
            </p>
          </div>
          <QRGenerator />
        </div>
      </section>

      {/* Footer */}
      <section className="border-t px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, Tailwind CSS, and{' '}
            <span className="text-primary">qr-code-styling</span>. Free &
            open source.
          </p>
        </div>
      </section>
    </div>
  );
}
