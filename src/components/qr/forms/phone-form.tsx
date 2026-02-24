'use client';

import { Phone } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhoneFormProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function PhoneForm({ value, onChange }: PhoneFormProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="qr-phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="qr-phone"
            type="tel"
            placeholder="+1 234 567 890"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Include the country code for international numbers. Scanning will
        initiate a phone call.
      </p>
    </div>
  );
}

export function buildPhoneString(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}
