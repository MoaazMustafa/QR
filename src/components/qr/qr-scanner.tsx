'use client';

import {
  Barcode,
  Camera,
  Check,
  Copy,
  ExternalLink,
  ImageUp,
  QrCode,
  ScanLine,
  X,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Dynamically import the scanner to avoid SSR issues
const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
  { ssr: false },
);

interface ScanResult {
  value: string;
  type: string;
  format: string;
  timestamp: Date;
}

function detectContentType(value: string): string {
  if (/^https?:\/\//i.test(value)) return 'URL';
  if (/^WIFI:/i.test(value)) return 'WiFi';
  if (/^BEGIN:VCARD/i.test(value)) return 'VCard';
  if (/^mailto:/i.test(value)) return 'Email';
  if (/^tel:/i.test(value)) return 'Phone';
  if (/^sms:/i.test(value)) return 'SMS';
  if (/^geo:/i.test(value)) return 'Location';
  return 'Text';
}

function detectScanFormat(format?: string): string {
  if (!format) return 'QR Code';
  const f = format.toLowerCase();
  if (f.includes('qr')) return 'QR Code';
  if (f.includes('ean_13') || f === 'ean-13') return 'EAN-13';
  if (f.includes('ean_8') || f === 'ean-8') return 'EAN-8';
  if (f.includes('upc_a') || f === 'upc-a') return 'UPC-A';
  if (f.includes('upc_e') || f === 'upc-e') return 'UPC-E';
  if (f.includes('code_128') || f === 'code-128') return 'Code 128';
  if (f.includes('code_39') || f === 'code-39') return 'Code 39';
  if (f.includes('code_93') || f === 'code-93') return 'Code 93';
  if (f.includes('itf')) return 'ITF';
  if (f.includes('codabar')) return 'Codabar';
  if (f.includes('data_matrix')) return 'Data Matrix';
  if (f.includes('aztec')) return 'Aztec';
  if (f.includes('pdf417') || f.includes('pdf_417')) return 'PDF417';
  return format;
}

function ScanResultCard({ result, onClear }: { readonly result: ScanResult; readonly onClear: () => void }) {
  const [copied, setCopied] = useState(false);
  const isQR = result.format === 'QR Code';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.value);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const isUrl = result.type === 'URL';

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              {isQR ? <QrCode className="size-4" /> : <Barcode className="size-4" />}
            </div>
            <div>
              <CardTitle className="text-base">{result.format} Detected</CardTitle>
              <CardDescription className="text-xs">
                Content: {result.type} • Format: {result.format} • {result.timestamp.toLocaleTimeString()}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClear}
            aria-label="Clear result"
          >
            <X className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 rounded-lg border bg-background p-3">
          <p className="break-all text-sm font-mono">{result.value}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="size-3.5 text-green-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          {isUrl && (
            <Button size="sm" className="gap-1.5" asChild>
              <a
                href={result.value}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-3.5" />
                Open Link
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function QRScanner() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scannerActive, setScannerActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = useCallback((detectedCodes: { rawValue: string; format?: string | number }[]) => {
    if (detectedCodes.length > 0) {
      const code = detectedCodes[0];
      const value = code.rawValue;
      if (!value) return;
      const type = detectContentType(value);
      const format = detectScanFormat(typeof code.format === 'string' ? code.format : undefined);
      setScanResult({ value, type, format, timestamp: new Date() });
      setScannerActive(false);
      toast.success(`${format} scanned successfully!`);
    }
  }, []);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsProcessing(true);
      try {
        const jsQR = (await import('jsqr')).default;
        const img = new Image();
        const url = URL.createObjectURL(file);

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Canvas not supported'));
              return;
            }
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, img.width, img.height);
            URL.revokeObjectURL(url);

            if (code) {
              const type = detectContentType(code.data);
              setScanResult({
                value: code.data,
                type,
                format: 'QR Code',
                timestamp: new Date(),
              });
              toast.success('QR code detected in image!');
            } else {
              toast.error('No QR code found in the image');
            }
            resolve();
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load image'));
          };
          img.src = url;
        });
      } catch {
        toast.error('Failed to process image');
      } finally {
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    },
    [],
  );

  const clearResult = () => {
    setScanResult(null);
    setScannerActive(true);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Tabs defaultValue="camera">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="camera" className="gap-2">
            <Camera className="size-4" />
            Camera
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2">
            <ImageUp className="size-4" />
            Upload Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="camera" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ScanLine className="size-5 text-primary" />
                Camera Scanner
              </CardTitle>
              <CardDescription>
                Point your camera at a QR code or barcode to scan it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/20">
                {scannerActive ? (
                  <div className="aspect-square max-h-[400px] w-full">
                    <Scanner
                      onScan={handleScan}
                      allowMultiple={false}
                      scanDelay={500}
                      styles={{
                        container: {
                          width: '100%',
                          height: '100%',
                        },
                        video: {
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        },
                      }}
                      components={{
                        finder: true,
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square max-h-[400px] w-full items-center justify-center bg-muted/50">
                    <div className="text-center">
                      <Check className="mx-auto mb-2 size-12 text-primary" />
                      <p className="font-medium">Code Scanned!</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={clearResult}
                      >
                        Scan Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImageUp className="size-5 text-primary" />
                Upload Image
              </CardTitle>
              <CardDescription>
                Upload an image containing a QR code or barcode to decode it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="qr-image-upload"
              />
              <label
                htmlFor="qr-image-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-muted-foreground/20 px-6 py-16 transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                {isProcessing ? (
                  <>
                    <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">
                      Processing image...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ImageUp className="size-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">
                        Click to upload an image
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        PNG, JPG, or WebP supported
                      </p>
                    </div>
                  </>
                )}
              </label>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Scan Result */}
      {scanResult ? (
        <ScanResultCard result={scanResult} onClear={clearResult} />
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <ScanLine className="mb-3 size-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No code scanned yet. Use the camera or upload an image to scan
              QR codes and barcodes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
