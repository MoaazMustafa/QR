'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextFormProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function TextForm({ value, onChange }: TextFormProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="qr-text">Text Content</Label>
        <Textarea
          id="qr-text"
          placeholder="Enter any text to encode into a QR code..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Any plain text content that will be encoded into the QR code.
      </p>
    </div>
  );
}
