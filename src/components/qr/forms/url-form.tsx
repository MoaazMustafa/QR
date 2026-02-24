'use client';

import { Globe } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UrlFormProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function UrlForm({ value, onChange }: UrlFormProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="qr-url">Website URL</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="qr-url"
            type="url"
            placeholder="https://example.com"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Enter a full URL including the protocol (https://).
      </p>
    </div>
  );
}
