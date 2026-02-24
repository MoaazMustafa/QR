'use client';

import { Barcode, Home, QrCode, ScanLine } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/generator', label: 'Generator', icon: QrCode },
    { href: '/scanner', label: 'Scanner', icon: ScanLine },
  ];

  return (
    <nav className="navbar fixed top-0 z-50 flex w-screen items-center justify-between border-b border-border bg-background/80 px-4 py-2 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <Link href="/" className="logo">
          <span className="ml-5 font-[family-name:var(--font-orbitron)] text-2xl font-bold text-primary">
            QRCraft
          </span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 sm:hidden">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className={cn(
                  'rounded-md p-2 transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="size-5" />
              </Link>
            );
          })}
        </div>
        <ThemeToggle className="mr-4" />
      </div>
    </nav>
  );
}