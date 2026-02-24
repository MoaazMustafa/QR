'use client';

import { ImagePlus, Palette, X } from 'lucide-react';
import { useCallback, useRef } from 'react';

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

import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  QROptions,
} from './qr-options';

interface QRCustomizationProps {
  readonly options: QROptions;
  readonly onChange: (options: QROptions) => void;
}

export function QRCustomization({ options, onChange }: QRCustomizationProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const update = useCallback(
    <K extends keyof QROptions>(key: K, value: QROptions[K]) => {
      onChange({ ...options, [key]: value });
    },
    [options, onChange],
  );

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update('logoUrl', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    update('logoUrl', '');
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  return (
    <div className="space-y-5">
      {/* Colors */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Palette className="size-4 text-primary" />
          Colors
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="fg-color" className="text-xs">
              Foreground
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="fg-color"
                value={options.fgColor}
                onChange={(e) => update('fgColor', e.target.value)}
                className="h-9 w-12 cursor-pointer rounded-md border border-input bg-transparent p-1"
              />
              <Input
                value={options.fgColor}
                onChange={(e) => update('fgColor', e.target.value)}
                className="h-9 font-mono text-xs"
                maxLength={7}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bg-color" className="text-xs">
              Background
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="bg-color"
                value={options.bgColor}
                onChange={(e) => update('bgColor', e.target.value)}
                className="h-9 w-12 cursor-pointer rounded-md border border-input bg-transparent p-1"
              />
              <Input
                value={options.bgColor}
                onChange={(e) => update('bgColor', e.target.value)}
                className="h-9 font-mono text-xs"
                maxLength={7}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Dot Style */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Dot Style</Label>
        <Select
          value={options.dotType}
          onValueChange={(v) => update('dotType', v as DotType)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="dots">Dots</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
            <SelectItem value="classy">Classy</SelectItem>
            <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
            <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Corner Styles */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-xs">Corner Square</Label>
          <Select
            value={options.cornerSquareType}
            onValueChange={(v) =>
              update('cornerSquareType', v as CornerSquareType)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="dot">Dot</SelectItem>
              <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Corner Dot</Label>
          <Select
            value={options.cornerDotType}
            onValueChange={(v) => update('cornerDotType', v as CornerDotType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="dot">Dot</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Size & Margin */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">
            Size: {options.width}px
          </Label>
        </div>
        <Slider
          min={150}
          max={600}
          step={10}
          value={[options.width]}
          onValueChange={([v]) => {
            update('width', v);
            update('height', v);
          }}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Margin: {options.margin}px</Label>
        <Slider
          min={0}
          max={50}
          step={1}
          value={[options.margin]}
          onValueChange={([v]) => update('margin', v)}
        />
      </div>

      {/* Error Correction */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Error Correction</Label>
        <Select
          value={options.errorCorrection}
          onValueChange={(v) =>
            update('errorCorrection', v as ErrorCorrectionLevel)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low (7%)</SelectItem>
            <SelectItem value="M">Medium (15%)</SelectItem>
            <SelectItem value="Q">Quartile (25%)</SelectItem>
            <SelectItem value="H">High (30%)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Higher correction allows more damage tolerance. Use Q or H when adding
          a logo.
        </p>
      </div>

      <Separator />

      {/* Logo */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ImagePlus className="size-4 text-primary" />
          Logo / Image
        </div>

        {options.logoUrl ? (
          <div className="flex items-center gap-3">
            <div className="relative size-12 overflow-hidden rounded-md border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={options.logoUrl}
                alt="Logo preview"
                className="size-full object-cover"
              />
            </div>
            <button
              onClick={removeLogo}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
              aria-label="Remove logo"
            >
              <X className="size-3" />
              Remove
            </button>
          </div>
        ) : (
          <div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-muted-foreground/25 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ImagePlus className="size-4" />
              Upload logo
            </label>
          </div>
        )}

        {options.logoUrl && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">
                Logo Size: {Math.round(options.logoSize * 100)}%
              </Label>
              <Slider
                min={0.1}
                max={0.5}
                step={0.05}
                value={[options.logoSize]}
                onValueChange={([v]) => update('logoSize', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="logo-clear" className="text-xs">
                Clear dots behind logo
              </Label>
              <Switch
                id="logo-clear"
                checked={options.logoClearBg}
                onCheckedChange={(v) => update('logoClearBg', v)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
