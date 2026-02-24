import type { Metadata } from 'next';

import { QRScanner } from '@/components/qr/qr-scanner';

export const metadata: Metadata = {
  title: 'Scanner — QRCraft',
  description:
    'Scan QR codes and barcodes using your camera or by uploading an image. Supports Code 128, EAN-13, UPC-A, and more.',
};

export default function ScannerPage() {
  return (
    <div className="min-h-screen px-4 pb-20 pt-24">
      <div className="mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            QR &amp; Barcode{' '}
            <span className="text-primary">Scanner</span>
          </h1>
          <p className="text-muted-foreground">
            Scan QR codes and barcodes using your camera or upload an image to decode
          </p>
        </div>

        <QRScanner />
      </div>
    </div>
  );
}
