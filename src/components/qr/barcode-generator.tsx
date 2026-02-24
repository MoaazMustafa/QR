'use client';

import { Check, ChevronDown, Copy, Download } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

const BARCODE_FORMATS = [
  { value: 'CODE128', label: 'Code 128', placeholder: 'Any text or number' },
  { value: 'EAN13', label: 'EAN-13', placeholder: '5901234123457' },
  { value: 'EAN8', label: 'EAN-8', placeholder: '96385074' },
  { value: 'UPC', label: 'UPC-A', placeholder: '123456789012' },
  { value: 'CODE39', label: 'Code 39', placeholder: 'HELLO-123' },
  { value: 'ITF14', label: 'ITF-14', placeholder: '12345678901231' },
  { value: 'MSI', label: 'MSI', placeholder: '1234567' },
  { value: 'pharmacode', label: 'Pharmacode', placeholder: '1234' },
] as const;

type BarcodeFormat = (typeof BARCODE_FORMATS)[number]['value'];

interface BarcodeOptions {
  format: BarcodeFormat;
  value: string;
  width: number;
  height: number;
  lineColor: string;
  background: string;
  displayValue: boolean;
  fontSize: number;
  margin: number;
}

const DEFAULT_OPTIONS: BarcodeOptions = {
  format: 'CODE128',
  value: 'QRCraft-2026',
  width: 2,
  height: 100,
  lineColor: '#000000',
  background: '#ffffff',
  displayValue: true,
  fontSize: 16,
  margin: 10,
};

const BARCODE_OPTIONS_STORAGE_KEY = 'qrcraft-barcode-options';

export function BarcodeGenerator() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [options, setOptions] = useState<BarcodeOptions>(DEFAULT_OPTIONS);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BARCODE_OPTIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<BarcodeOptions>;
        setOptions((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(BARCODE_OPTIONS_STORAGE_KEY, JSON.stringify(options));
    } catch {
      // Ignore quota errors
    }
  }, [options, hydrated]);

  const update = useCallback(
    <K extends keyof BarcodeOptions>(key: K, value: BarcodeOptions[K]) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const currentFormat = BARCODE_FORMATS.find((f) => f.value === options.format);

  useEffect(() => {
    if (!svgRef.current || !options.value) {
      setError('Enter a value to generate a barcode');
      return;
    }

    const generateBarcode = async () => {
      try {
        const JsBarcode = (await import('jsbarcode')).default;
        JsBarcode(svgRef.current, options.value, {
          format: options.format,
          width: options.width,
          height: options.height,
          lineColor: options.lineColor,
          background: options.background,
          displayValue: options.displayValue,
          fontSize: options.fontSize,
          margin: options.margin,
          font: 'var(--font-geist-sans), sans-serif',
          textMargin: 4,
        });
        setError(null);
      } catch {
        setError(
          `Invalid value for ${currentFormat?.label || options.format} format`,
        );
      }
    };

    generateBarcode();
  }, [options, currentFormat?.label]);

  const downloadBarcode = useCallback(
    (format: 'png' | 'jpg' | 'svg') => {
      if (!svgRef.current || error) return;

      const svgData = new XMLSerializer().serializeToString(svgRef.current);

      if (format === 'svg') {
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `barcode-${options.format}.svg`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Barcode downloaded as SVG');
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        ctx.scale(2, 2);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const ext = format === 'jpg' ? 'jpg' : 'png';
        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            const dlUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = dlUrl;
            a.download = `barcode-${options.format}.${ext}`;
            a.click();
            URL.revokeObjectURL(dlUrl);
            toast.success(`Barcode downloaded as ${ext.toUpperCase()}`);
          },
          mimeType,
          0.95,
        );
      };
      img.src = url;
    },
    [error, options.format],
  );

  const handleCopy = useCallback(async () => {
    if (!svgRef.current || error) return;
    try {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          ctx.scale(2, 2);
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          canvas.toBlob(async (blob) => {
            if (!blob) {
              reject(new Error('Failed'));
              return;
            }
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob }),
              ]);
              resolve();
            } catch (err) {
              reject(err);
            }
          }, 'image/png');
        };
        img.onerror = reject;
        img.src = url;
      });

      setCopied(true);
      toast.success('Barcode copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  }, [error]);

  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto]">
        {/* Left: Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Create Barcode</CardTitle>
              <CardDescription>
                Choose a format and enter your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Format */}
              <div className="space-y-2">
                <Label>Barcode Format</Label>
                <Select
                  value={options.format}
                  onValueChange={(v) => update('format', v as BarcodeFormat)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BARCODE_FORMATS.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Value */}
              <div className="space-y-2">
                <Label htmlFor="barcode-value">Value</Label>
                <Input
                  id="barcode-value"
                  placeholder={currentFormat?.placeholder}
                  value={options.value}
                  onChange={(e) => update('value', e.target.value)}
                />
                {error && (
                  <p className="text-xs text-destructive">{error}</p>
                )}
              </div>

              <Separator />

              {/* Colors */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">Line Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.lineColor}
                      onChange={(e) => update('lineColor', e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded-md border border-input bg-transparent p-1"
                    />
                    <Input
                      value={options.lineColor}
                      onChange={(e) => update('lineColor', e.target.value)}
                      className="h-9 font-mono text-xs"
                      maxLength={7}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Background</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.background}
                      onChange={(e) => update('background', e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded-md border border-input bg-transparent p-1"
                    />
                    <Input
                      value={options.background}
                      onChange={(e) => update('background', e.target.value)}
                      className="h-9 font-mono text-xs"
                      maxLength={7}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Size Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Bar Width: {options.width}
                </Label>
                <Slider
                  min={1}
                  max={5}
                  step={0.5}
                  value={[options.width]}
                  onValueChange={([v]) => update('width', v)}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Height: {options.height}px
                </Label>
                <Slider
                  min={40}
                  max={200}
                  step={5}
                  value={[options.height]}
                  onValueChange={([v]) => update('height', v)}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Margin: {options.margin}px
                </Label>
                <Slider
                  min={0}
                  max={30}
                  step={1}
                  value={[options.margin]}
                  onValueChange={([v]) => update('margin', v)}
                />
              </div>

              <Separator />

              {/* Text Display */}
              <div className="flex items-center justify-between">
                <Label htmlFor="show-text" className="text-sm">
                  Show text below barcode
                </Label>
                <Switch
                  id="show-text"
                  checked={options.displayValue}
                  onCheckedChange={(v) => update('displayValue', v)}
                />
              </div>

              {options.displayValue && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Font Size: {options.fontSize}px
                  </Label>
                  <Slider
                    min={10}
                    max={28}
                    step={1}
                    value={[options.fontSize]}
                    onValueChange={([v]) => update('fontSize', v)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Preview & Download */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-4">
            <Card className="flex items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary/20 bg-white p-6">
              {error ? (
                <div className="flex h-[150px] w-[300px] items-center justify-center text-center text-sm text-muted-foreground">
                  {error}
                </div>
              ) : (
                <svg ref={svgRef} className="max-w-full" />
              )}
            </Card>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex-1 gap-2" disabled={!!error}>
                    <Download className="size-4" />
                    Download
                    <ChevronDown className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={() => downloadBarcode('png')}>
                    <Download className="mr-2 size-4" />
                    PNG (Recommended)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadBarcode('jpg')}>
                    <Download className="mr-2 size-4" />
                    JPG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadBarcode('svg')}>
                    <Download className="mr-2 size-4" />
                    SVG (Vector)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                disabled={!!error}
                aria-label="Copy barcode to clipboard"
              >
                {copied ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
