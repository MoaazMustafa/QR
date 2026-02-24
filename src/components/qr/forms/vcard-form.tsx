'use client';

import { Contact } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  note: string;
}

interface VCardFormProps {
  readonly value: VCardData;
  readonly onChange: (value: VCardData) => void;
}

export function VCardForm({ value, onChange }: VCardFormProps) {
  const update = (field: keyof VCardData, val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="vcard-first">First Name</Label>
          <div className="relative">
            <Contact className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="vcard-first"
              placeholder="John"
              value={value.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="vcard-last">Last Name</Label>
          <Input
            id="vcard-last"
            placeholder="Doe"
            value={value.lastName}
            onChange={(e) => update('lastName', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vcard-org">Organization</Label>
        <Input
          id="vcard-org"
          placeholder="Company Name"
          value={value.organization}
          onChange={(e) => update('organization', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="vcard-phone">Phone</Label>
          <Input
            id="vcard-phone"
            type="tel"
            placeholder="+1 234 567 890"
            value={value.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vcard-email">Email</Label>
          <Input
            id="vcard-email"
            type="email"
            placeholder="john@example.com"
            value={value.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vcard-website">Website</Label>
        <Input
          id="vcard-website"
          type="url"
          placeholder="https://example.com"
          value={value.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vcard-address">Address</Label>
        <Input
          id="vcard-address"
          placeholder="123 Main St, City, Country"
          value={value.address}
          onChange={(e) => update('address', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vcard-note">Note</Label>
        <Textarea
          id="vcard-note"
          placeholder="Additional notes..."
          value={value.note}
          onChange={(e) => update('note', e.target.value)}
          rows={2}
          className="resize-none"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Scanning will add this contact to the phone&apos;s address book.
      </p>
    </div>
  );
}

export function buildVCardString(data: VCardData): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`,
  ];
  if (data.organization) lines.push(`ORG:${data.organization}`);
  if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.address) lines.push(`ADR:;;${data.address};;;;`);
  if (data.note) lines.push(`NOTE:${data.note}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}
