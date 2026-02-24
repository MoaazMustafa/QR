'use client';

import { Check, ChevronDown, Copy, Download } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type QRCodeStylingType = import('qr-code-styling').default;

interface QRDownloadProps {
  readonly qrInstance: QRCodeStylingType | null;
  readonly fileName?: string;
}

export function QRDownload({
  qrInstance,
  fileName = 'qr-code',
}: QRDownloadProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = useCallback(
    async (extension: 'png' | 'jpeg' | 'webp' | 'svg') => {
      if (!qrInstance) return;
      try {
        await qrInstance.download({
          name: fileName,
          extension,
        });
        toast.success(`QR code downloaded as ${extension.toUpperCase()}`);
      } catch {
        toast.error('Failed to download QR code');
      }
    },
    [qrInstance, fileName],
  );

  const handleCopy = useCallback(async () => {
    if (!qrInstance) return;
    try {
      const rawData = await qrInstance.getRawData('png');
      if (!rawData) throw new Error('Failed to generate image');
      const blob = rawData instanceof Blob
        ? rawData
        : new Blob([new Uint8Array(rawData as unknown as ArrayBuffer)], { type: 'image/png' });
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      toast.success('QR code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  }, [qrInstance]);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex-1 gap-2" disabled={!qrInstance}>
            <Download className="size-4" />
            Download
            <ChevronDown className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={() => handleDownload('png')}>
            <Download className="mr-2 size-4" />
            PNG (Recommended)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload('jpeg')}>
            <Download className="mr-2 size-4" />
            JPG
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload('svg')}>
            <Download className="mr-2 size-4" />
            SVG (Vector)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload('webp')}>
            <Download className="mr-2 size-4" />
            WebP
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        disabled={!qrInstance}
        aria-label="Copy QR code to clipboard"
      >
        {copied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
    </div>
  );
}
