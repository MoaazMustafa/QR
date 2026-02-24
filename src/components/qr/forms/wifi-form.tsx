'use client';

import { Wifi } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WifiData {
  ssid: string;
  password: string;
  encryption: string;
  hidden: boolean;
}

interface WifiFormProps {
  readonly value: WifiData;
  readonly onChange: (value: WifiData) => void;
}

export function WifiForm({ value, onChange }: WifiFormProps) {
  const update = (field: keyof WifiData, val: string | boolean) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
        <div className="relative">
          <Wifi className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="wifi-ssid"
            placeholder="MyWiFiNetwork"
            value={value.ssid}
            onChange={(e) => update('ssid', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="wifi-encryption">Encryption</Label>
        <Select
          value={value.encryption}
          onValueChange={(v) => update('encryption', v)}
        >
          <SelectTrigger id="wifi-encryption">
            <SelectValue placeholder="Select encryption" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WPA">WPA/WPA2</SelectItem>
            <SelectItem value="WEP">WEP</SelectItem>
            <SelectItem value="nopass">None</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {value.encryption !== 'nopass' && (
        <div className="space-y-2">
          <Label htmlFor="wifi-password">Password</Label>
          <Input
            id="wifi-password"
            type="password"
            placeholder="Enter WiFi password"
            value={value.password}
            onChange={(e) => update('password', e.target.value)}
          />
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Scan this QR code to automatically connect to the WiFi network.
      </p>
    </div>
  );
}

export function buildWifiString(data: WifiData): string {
  const escaped = (s: string) =>
    s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/:/g, '\\:').replace(/"/g, '\\"');
  return `WIFI:T:${data.encryption};S:${escaped(data.ssid)};P:${escaped(data.password)};H:${data.hidden ? 'true' : 'false'};;`;
}
