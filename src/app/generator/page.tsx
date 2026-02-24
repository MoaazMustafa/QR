'use client';

import { Barcode, QrCode } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { BarcodeGenerator } from '@/components/qr/barcode-generator';
import { QRGenerator } from '@/components/qr/qr-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function GeneratorContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'barcode' ? 'barcode' : 'qr';

  return (
    <div className="min-h-screen px-4 pb-20 pt-24">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            Code{' '}
            <span className="text-primary">Generator</span>
          </h1>
          <p className="text-muted-foreground">
            Create QR codes or barcodes — customize, preview, and download
            instantly
          </p>
        </div>

        {/* QR / Barcode Tabs */}
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="qr" className="gap-2 text-sm">
                <QrCode className="size-4" />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="barcode" className="gap-2 text-sm">
                <Barcode className="size-4" />
                Barcode
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="qr">
            <QRGenerator />
          </TabsContent>

          <TabsContent value="barcode">
            <BarcodeGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <GeneratorContent />
    </Suspense>
  );
}
