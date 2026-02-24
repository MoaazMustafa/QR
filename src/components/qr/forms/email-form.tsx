'use client';

import { Mail } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EmailData {
  address: string;
  subject: string;
  body: string;
}

interface EmailFormProps {
  readonly value: EmailData;
  readonly onChange: (value: EmailData) => void;
}

export function EmailForm({ value, onChange }: EmailFormProps) {
  const update = (field: keyof EmailData, val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="email-address">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email-address"
            type="email"
            placeholder="user@example.com"
            value={value.address}
            onChange={(e) => update('address', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-subject">Subject (optional)</Label>
        <Input
          id="email-subject"
          placeholder="Email subject line"
          value={value.subject}
          onChange={(e) => update('subject', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-body">Body (optional)</Label>
        <Textarea
          id="email-body"
          placeholder="Email body text..."
          value={value.body}
          onChange={(e) => update('body', e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Scanning will open the default email client with the pre-filled fields.
      </p>
    </div>
  );
}

export function buildEmailString(data: EmailData): string {
  const params = new URLSearchParams();
  if (data.subject) params.set('subject', data.subject);
  if (data.body) params.set('body', data.body);
  const query = params.toString();
  return `mailto:${data.address}${query ? `?${query}` : ''}`;
}
