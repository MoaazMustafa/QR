'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { buildQRCodeStylingOptions, type QROptions } from './qr-options';

type QRCodeStylingType = import('qr-code-styling').default;

interface QRDisplayProps {
  readonly options: QROptions;
  readonly className?: string;
  readonly onQRReady?: (qr: QRCodeStylingType) => void;
}

export function QRDisplay({ options, className, onQRReady }: QRDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStylingType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initQR = useCallback(async () => {
    const QRCodeStyling = (await import('qr-code-styling')).default;
    const config = buildQRCodeStylingOptions(options);
    const qr = new QRCodeStyling(config);

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      qr.append(containerRef.current);
    }

    qrRef.current = qr;
    onQRReady?.(qr);
    setIsLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    initQR();
  }, [initQR]);

  useEffect(() => {
    if (!qrRef.current) return;
    const config = buildQRCodeStylingOptions(options);
    qrRef.current.update(config);
  }, [options]);

  return (
    <Card
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary/20 bg-white p-6',
        className,
      )}
    >
      {isLoading && (
        <div className="flex h-[300px] w-[300px] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
      <div
        ref={containerRef}
        className={cn('flex items-center justify-center', isLoading && 'hidden')}
      />
    </Card>
  );
}
